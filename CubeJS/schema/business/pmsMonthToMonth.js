cube(`bus_pms_MonthToMonth`, {
    sql: `
    WITH occupancy_cte as (
        SELECT
          occupancy.business_unit_id,
          ORE.relationship_type_name,	
          occupancy.household_move_in_date,
          occupancy.start_date,
          ORE.SUBS_VALID_SPAN_LOWER AS lower_span,
          ORE.SUBS_VALID_SPAN_UPPER AS upper_span,
          occupancy.household_move_out_date,
          coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date,
          concat(P.c_given_name,' ', P.c_family_name) AS RESIDENT,
          LVIE.RENT_AMOUNT as LEASE_RENT,
          vacate_notice.declared_move_out_date EXPECTED_MOVEOUT,
          u.c_unit_name as UNIT_NAME,
          occupancy.unit_id
        FROM  ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase
        LEFT JOIN ${raw_pmsleasing_occupancy.sql()} AS occupancy ON occupancy_phase.occupancy_id = occupancy.occupancy_id
        LEFT JOIN ${raw_pmsleasing_unit.sql()} U ON occupancy.unit_id = U.unit_id and U.BUSINESS_UNIT_ID = occupancy.BUSINESS_UNIT_ID
        LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} LVIE ON LVIE.OCCUPANCY_ID = occupancy.occupancy_id AND LVIE.OCCUPANCY_PHASE_INDEX = occupancy_phase.occupancy_phase_index
        LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} ORE ON ORE.occupancy_id = occupancy.occupancy_id
        LEFT JOIN ${raw_pmsleasing_party.sql()}  P ON P.PARTY_ID = ORE.PARTY_ID  
        LEFT JOIN ${raw_pmsleasing_vacateNotice.sql()} AS vacate_notice ON occupancy.occupancy_id = vacate_notice.occupancy_id AND vacate_notice.canceled_date IS NULL
        WHERE (${FILTER_PARAMS.bus_pms_MonthToMonth.businessUnitId.filter((value) => `occupancy.business_unit_id = ${value}`)})
        and (
            ORE.SUBS_VALID_SPAN_LOWER >= CURRENT_DATE()
        AND 
            ORE.SUBS_VALID_SPAN_UPPER <= CURRENT_DATE())
        ),
        amnt_cte as (
            select
                SUM(ca.total) as AMNT_RENT_TOTAL, cal.location_id 
            from ${raw_pmsamnt_commAmntLocations.sql()} cal            
            left join ${raw_pmsamnt_commAmnt.sql()} ca on cal.community_amenity_id = ca.id            
            group by cal.location_id
        ),
        pre_cte as (
            Select
                OC.business_unit_id AS BUSINESS_UNIT_ID,
                OC.RELATIONSHIP_TYPE_NAME,
                oc.unit_name UNIT_NAME,
                OC.RESIDENT,
                UT.NAME as UNIT_TYPE,
                to_char(BEDROOM_NUM) || '/' || to_char(BATHROOM_NUM) as BED_BATH,
                SI.SQUARE_FOOTAGE,
                OC.upper_span EXPIRATION_DATE,
                OC.LEASE_RENT,
                null as MONTH_TO_MONTH_FEE,
                coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL as MARKET_RENT,
                OC.LEASE_RENT - (coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL) as DIFFERENCE,
                EXPECTED_MOVEOUT
            from occupancy_cte OC
            left join ${raw_pmscbr_unitSpecsInfo.sql()} SI on SI.unit_id = OC.unit_id and SI.building_id is not null
            left join ${raw_pmscbr_unitTypes.sql()} UT on SI.unit_type_id = UT.id and UT.DELETED_AT is null
            left join ${raw_pmsamnt_commAmnt.sql()} CA ON UT.COMMUNITY_ID = CA.COMMUNITY_ID
            left join ${raw_pmsamnt_Amnt.sql()} A on A.ID = CA.AMENITY_ID
            left join amnt_cte AM on OC.unit_id = AM.location_id
            Where UT.DELETED_AT is null
            and SI.BUILDING_ID is not null
            GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
        ),
        calculated_cte as (
            Select 
                *,
                SUM(CASE WHEN RELATIONSHIP_TYPE_NAME = 'Resident' then 1 else 0 end) OVER(PARTITION BY BUSINESS_UNIT_ID) AS TOTAL_RESIDENTS,
                (SUM(CASE WHEN RELATIONSHIP_TYPE_NAME = 'Resident' then 1 else 0 end) OVER(PARTITION BY BUSINESS_UNIT_ID))*100 / COUNT(*) OVER(PARTITION BY BUSINESS_UNIT_ID) AS PERCENTAGE_OF_RESIDENTS,
                SUM(DIFFERENCE) OVER(PARTITION BY BUSINESS_UNIT_ID) AS TOTAL_RENT_DIFFERENCE
            from pre_cte
        )
        select * from calculated_cte where RELATIONSHIP_TYPE_NAME = 'Resident'`,
        
    dimensions: {
        
        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
            type: `string`,
            title: `BusinessUnit`
        },

        unitName: {
            sql: ` ${CUBE}."UNIT_NAME"`,                 
            type: `string`,
            title: `Unit`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },
        
        resident: {
            sql: ` ${CUBE}."RESIDENT"`,                 
            type: `string`,
            title: `Resident`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },
        
        unitType: {
            sql: ` ${CUBE}."UNIT_TYPE"`,                 
            type: `string`,
            title: `Unit type`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },
                
        bedBath: {
            sql: `${CUBE}."BED_BATH"`,                 
            type: `string`,
            title: `Bed/bath`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            }  
        },
            
        sqFeet: {
            sql: ` ${CUBE}."SQUARE_FOOTAGE"`,                 
            type: `string`,
            title: `Sq. Ft.`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            }
        },
        
        leaseExpirationDate: {
            sql: `${CUBE}."EXPIRATION_DATE"`,                
            type: `time`,
            title: `Lease expiration date`,
            meta: {
                styleType: 'longDate',
                show: true,
                sortable: true,
                size: 150
            }
        },
        
        leaseRent: {
            sql: ` ${CUBE}."LEASE_RENT"`,                 
            type: `number`,
            title: `Current rent amount`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            }  
        },

        monthToMonthFee: {
            sql: ` ${CUBE}."MONTH_TO_MONTH_FEE"`,                 
            type: `number`,
            title: `Month to month fee`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            }  
        },
        
        marketRent: {
            sql: ` ${CUBE}."MARKET_RENT"`,                 
            type: `number`,
            title: `Market rent amount`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            }  
        },
        
        difference: {
            sql: ` ${CUBE}."DIFFERENCE"`,                 
            type: `number`,
            title: `Rent difference`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            }  
        },
        
        expectedMoveOutDate: {
            sql: `${CUBE}."EXPECTED_MOVEOUT"`,                
            type: `time`,
            title: `Expected move-out`,
            meta: {
                styleType: 'longDate',
                show: true,
                sortable: true,
                size: 112
            }
        },

        totalResidents: {
            sql: ` ${CUBE}."TOTAL_RESIDENTS"`,                 
            type: `number`,
            title: `Number of residents`,
            meta: {
                styleType: 'number',
                show: true,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true,
                isGroupIdentifier: true,
                layout: 'column'
            }  
        },

        percentageOfResidents: {
            sql: ` ${CUBE}."PERCENTAGE_OF_RESIDENTS"`,                 
            type: `number`,
            title: `Percentage of residents`,
            meta: {
                styleType: 'percent',
                show: true,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true,
                isGroupIdentifier: true,
                layout: 'column'
            }  
        },

        totalRentDifference: {
            sql: ` ${CUBE}."TOTAL_RENT_DIFFERENCE"`,                 
            type: `number`,
            title: `Total rent difference`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true,
                isGroupIdentifier: true,
                layout: 'column'
            }  
        },
    },
    
    dataSource: `snowflake_pms`

    }
);
