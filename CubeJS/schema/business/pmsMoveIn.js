cube(`bus_pms_MoveIn`, {
    sql: `WITH occupancy_cte as (
      SELECT 
        occupancy.business_unit_id,
        occupancy.occupancy_id,
        occupancy.household_move_in_date
        ,occupancy.start_date
        ,ORE.SUBS_VALID_SPAN_LOWER AS lower_span
        ,ORE.SUBS_VALID_SPAN_UPPER AS upper_span
        ,occupancy.household_move_out_date
        ,coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date
        ,concat(P.c_given_name,' ', P.c_family_name) AS RESIDENT
        , LVIE.RENT_AMOUNT as LEASE_RENT
        , EP.PHONE_NUMBER
        , coalesce(occupancy_phase.occupancy_phase_type, 'Vacant') as OC_PHASE_TYPE
        ,occupancy.CURRENT_STATUS
        ,u.c_unit_name as UNIT_NAME
        ,occupancy.unit_id
      FROM  ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase
      LEFT JOIN ${raw_pmsleasing_occupancy.sql()} AS occupancy ON occupancy_phase.occupancy_id = occupancy.occupancy_id
      LEFT JOIN ${raw_pmsleasing_unit.sql()} U ON occupancy.unit_id = U.unit_id and U.BUSINESS_UNIT_ID = occupancy.BUSINESS_UNIT_ID
      LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} LVIE ON LVIE.OCCUPANCY_ID = occupancy.occupancy_id AND LVIE.OCCUPANCY_PHASE_INDEX = occupancy_phase.occupancy_phase_index
      LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} ORE ON ORE.occupancy_id = occupancy.occupancy_id
      LEFT JOIN ${raw_pmsleasing_party.sql()}  P ON P.PARTY_ID = ORE.PARTY_ID
      LEFT JOIN ${raw_pmscorecontact_entityPhone.sql()} EP ON P.PARTY_ID = EP.ENTITY_ID
      WHERE ORE.RELATIONSHIP_TYPE_NAME='Resident'
      AND (${FILTER_PARAMS.bus_pms_MoveIn.businessUnitId.filter((value) => `occupancy.business_unit_id = ${value}`)})
      AND (${FILTER_PARAMS.bus_pms_MoveIn.moveInDate.filter((from, to) => `occupancy.household_move_in_date >= ${from} AND occupancy.household_move_in_date <= ${to}`)})
      ),
      amnt_cte as (select SUM(ca.total) as AMNT_RENT_TOTAL, cal.location_id
            from ${raw_pmsamnt_commAmntLocations.sql()} cal
            left join ${raw_pmsamnt_commAmnt.sql()} ca on cal.community_amenity_id = ca.id
            group by cal.location_id),
      pre_cte as (Select OC.business_unit_id AS BUSINESS_UNIT_ID,
             Case
              when OC.CURRENT_STATUS = 'future' AND OC.move_in_date > CURRENT_DATE()  THEN 'Future'
              when OC.CURRENT_STATUS = 'approved' AND OC.move_in_date < CURRENT_DATE() THEN 'Past Due'
              when OC.OC_PHASE_TYPE = 'in term' AND OC.move_in_date < CURRENT_DATE() THEN 'Completed'
             ELSE null
             END as MOVE_IN_STATUS,
             oc.unit_name UNIT_NAME,
             OC.RESIDENT,
             UT.NAME as UNIT_TYPE,
             to_char(BEDROOM_NUM) || '/' || to_char(BATHROOM_NUM) as BED_BATH,
             SI.SQUARE_FOOTAGE,
             OC.LEASE_RENT,
             coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL as MARKET_RENT,
             OC.LEASE_RENT - (coalesce(si.base_rent, ut.base_rent) + AM.AMNT_RENT_TOTAL) as DIFFERENCE,
             OC.move_in_date MOVE_IN_DATE,
             DATEDIFF(month, OC.lower_span, OC.upper_span) +
                CASE
                    WHEN DAY(OC.lower_span) <= DAY(OC.upper_span) THEN 1
                    ELSE 0
             END AS LEASE_TERM_LENGTH,
             OC.PHONE_NUMBER
      from occupancy_cte OC
      left join ${raw_pmscbr_unitSpecsInfo.sql()} SI on SI.unit_id = OC.unit_id and SI.building_id is not null
      left join ${raw_pmscbr_unitTypes.sql()} UT on SI.unit_type_id = UT.id and UT.DELETED_AT is null
      left join ${raw_pmsamnt_commAmnt.sql()} CA ON UT.COMMUNITY_ID = CA.COMMUNITY_ID
      left join amnt_cte AM on OC.unit_id = AM.location_id
      Where UT.DELETED_AT is null
      and SI.BUILDING_ID is not null
      GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13)
      Select
            *,
            COUNT(*) OVER (PARTITION BY BUSINESS_UNIT_ID,MOVE_IN_STATUS) as TOTAL_MOVEIN_STATUS
      From pre_cte where MOVE_IN_STATUS is not null`,

    dimensions: {

        moveInStatusTotal: {
            sql: `${CUBE}."TOTAL_MOVEIN_STATUS"`,
            type: `number`,
            title: `Units`,
            meta: {
                styleType: 'number',
                show: false,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true
              }
          },

        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,
            type: `string`,
            title: `BusinessUnit`
          },

        moveInStatus: {
            sql: ` ${CUBE}."MOVE_IN_STATUS"`,
            type: `string`,
            title: `Move In`,
            meta: {
                styleType: 'string',
                show: false,
                size: 135,
                sortable: true,
                isGroupIdentifier: true,
                "showOnHeaderBox": true,
                "showLabelOnHeaderBox": true
              }
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
        title: `Unit Type`,
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

  marketRent: {
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

moveInDate: {
    sql: `${CUBE}."MOVE_IN_DATE"`,
    type: `time`,
    title: `Move in date`,
    meta: {
      styleType: 'longDate',
      show: true,
      sortable: true,
      size: 112
    }
  },

  leaseTermLength: {
    sql: ` ${CUBE}."LEASE_TERM_LENGTH"`,
    type: `string`,
    title: `Lease Term Length`,
    meta: {
      styleType: 'string',
      show: true,
      size: 135,
      sortable: true
    },
  },

PhoneNumber: {
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

},

    dataSource: `snowflake_pms`
});
