cube(`bus_pms_leaseExpiration`, {
    sql: `
    WITH occupancy_cte as (
      SELECT 
        occupancy.business_unit_id,
        occupancy.occupancy_id,
        occupancy.household_move_in_date,
        occupancy.start_date,
        ORE.SUBS_VALID_SPAN_LOWER AS lower_span,
        ORE.SUBS_VALID_SPAN_UPPER AS upper_span,
        occupancy.household_move_out_date,
        coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date,
        LVIE.RENT_AMOUNT as LEASE_RENT,
        EP.PHONE_NUMBER,
        coalesce(occupancy_phase.occupancy_phase_type, 'Vacant') as UNIT_STATUS,
        u.c_unit_name as unit_name,
        occupancy.unit_id,
        listagg(distinct P.FULLNAME, ', ') WITHIN GROUP (ORDER BY P.FULLNAME) AS RESIDENT
      FROM  ${raw_pmsleasing_occupancy.sql()} AS occupancy
      LEFT JOIN ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase ON occupancy_phase.occupancy_id = occupancy.occupancy_id
      LEFT JOIN ${raw_pmsleasing_unit.sql()} U ON occupancy.unit_id = u.unit_id and U.BUSINESS_UNIT_ID = occupancy.BUSINESS_UNIT_ID
      LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} LVIE ON LVIE.OCCUPANCY_ID = occupancy_phase.occupancy_id AND LVIE.OCCUPANCY_PHASE_INDEX = occupancy_phase.occupancy_phase_index
      LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} ORE ON ORE.occupancy_id = occupancy.occupancy_id
      LEFT JOIN ${raw_pmsleasing_party.sql()}  P ON P.PARTY_ID = ORE.PARTY_ID
      LEFT JOIN ${raw_pmscorecontact_entityPhone.sql()} EP ON P.PARTY_ID = EP.ENTITY_ID
      WHERE ORE.RELATIONSHIP_TYPE_NAME='Resident'
      and ${FILTER_PARAMS.bus_pms_leaseExpiration.
        businessUnitId.filter((value) => `occupancy.BUSINESS_UNIT_ID = ${value}`)}
      and ${FILTER_PARAMS.bus_pms_leaseExpiration.leaseExpirationDate.filter((from, to) => `
      ORE.SUBS_VALID_SPAN_LOWER >= ${from} AND
      ORE.SUBS_VALID_SPAN_UPPER <= ${to}`)}
      GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13
      ),
      amnt_cte as (select SUM(ca.total) as AMNT_RENT_TOTAL, cal.location_id
            from ${raw_pmsamnt_commAmntLocations.sql()} cal
            left join ${raw_pmsamnt_commAmnt.sql()} ca on cal.community_amenity_id = ca.id
            group by cal.location_id),
      pre_cte as (Select
            oc.business_unit_id,
            oc.unit_name,
             OC.RESIDENT,
              UT.NAME as UNIT_TYPE,
             to_char(BEDROOM_NUM) || '/' || to_char(BATHROOM_NUM) as BED_BATH,
             SI.SQUARE_FOOTAGE,
             OC.LEASE_RENT,
             coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL as MARKET_RENT,
             OC.LEASE_RENT - (coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL) as DIFFERENCE,
             OC.upper_span as EXPIRATION_DATE,
             OC.PHONE_NUMBER,
             OC.UNIT_STATUS,
             datediff(day, CURRENT_DATE(), OC.upper_span ) DAYS,
             COUNT(*) OVER (PARTITION BY datediff(day, CURRENT_DATE(), OC.upper_span ))  as UNITS_COUNT
      from occupancy_cte OC
      left join ${raw_pmscbr_unitSpecsInfo.sql()} si on si.unit_id = oc.unit_id and si.building_id is not null
      left join ${raw_pmscbr_unitTypes.sql()} ut on si.unit_type_id = ut.id and UT.DELETED_AT is null
      left join amnt_cte AM on oc.unit_id = AM.location_id
      GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)

      Select *,
             Case when DAYS >= 0 and DAYS <=30 THEN '0-30'
              when DAYS > 30 and DAYS <=60 THEN '31-60'
              when DAYS > 60 and DAYS <=90 THEN '61-90'
              when DAYS > 90 THEN '90+'
             ELSE 'EXPIRED'
             END as CATEGORY_DAYS
      From pre_cte`,

    dimensions: {

      unitName: {
        sql: ` ${CUBE}."UNIT_NAME"`,
        type: `string`,
        title: `Unit name`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        },
      },

      businessUnitId: {
        sql: ` ${CUBE}."BUSINESS_UNIT_ID"`,
        type: `string`
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
          sortable: true,
          filterPosition: 'key,label'
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
        title: `Sq. Feet`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
    },

    leaseRent: {
      sql: ` ${CUBE}."LEASE_RENT"`,
      type: `number`,
      title: `Lease rent`,
      meta: {
        styleType: 'money',
        show: true,
        size: 135,
        sortable: true
      }
  },

  MarketRent: {
    sql: ` ${CUBE}."MARKET_RENT"`,
    type: `number`,
    title: `Market rent`,
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
  title: `Difference`,
  meta: {
    styleType: 'money',
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

residentPhoneNumber: {
  sql: ` ${CUBE}."PHONE_NUMBER"`,
  type: `string`,
  title: `Resident phone number`,
  meta: {
    styleType: 'string',
    show: true,
    size: 135,
    sortable: true
  }
},

unitStatus: {
  sql: ` ${CUBE}."UNIT_STATUS"`,
  type: `string`,
  title: `Unit Status`,
  meta: {
    styleType: 'string',
    show: true,
    size: 135,
    sortable: true
  }
},

unitCount: {
  sql: ` ${CUBE}."UNITS_COUNT"`,
  type: `string`,
  title: `Unit count`,
  meta: {
    styleType: 'string',
    show: false,
    size: 135,
    sortable: true,
    showOnHeaderBox: true,
    showLabelOnHeaderBox: true
  }
},

expDays: {
  sql: `concat(${CUBE}."CATEGORY_DAYS", CASE WHEN ${CUBE}."CATEGORY_DAYS" != 'EXPIRED' THEN ' days' ELSE '' END)`,
  type: `string`,
  title: `Expiration days`,
  meta: {
    styleType: 'string',
    show: false,
    size: 135,
    sortable: true,
    showOnHeaderBox: true,
    showLabelOnHeaderBox: false,
    isGroupIdentifier: true,
    filterPosition: 'key,label'
  }
},

},

    dataSource: `snowflake_pms`
});
