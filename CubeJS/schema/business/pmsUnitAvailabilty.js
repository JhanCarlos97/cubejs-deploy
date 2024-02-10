cube(`bus_pms_unitAvailability`, {
sql: `
WITH RESIDENT_LIST AS (
  SELECT occupancy_relationship.BUSINESS_UNIT_ID
    ,occupancy_relationship.OCCUPANCY_ID
    ,CONCAT (c_given_name,' ',c_family_name) RESIDENT
    ,relationship_type_name RESIDENT_TYPE
    ,occupancy_relationship.SUBS_VALID_SPAN_LOWER
    ,occupancy_relationship.SUBS_VALID_SPAN_UPPER
    ,valid_span
  FROM ${raw_pmsleasing_occupancyRelationship.sql()} AS occupancy_relationship
  INNER JOIN ${raw_pmsleasing_party.sql()} AS party ON occupancy_relationship.party_id = party.party_id
  LEFT JOIN ${raw_pmsauth_communities.sql()}  communities ON occupancy_relationship.business_unit_id = communities.id
  WHERE (${FILTER_PARAMS.bus_pms_unitAvailability.businessUnitId.filter((value) => `occupancy_relationship.business_unit_id = ${value}`)})
  AND ${FILTER_PARAMS.bus_pms_unitAvailability.transactionDate.filter((value) =>
    `convert_timezone('UTC', timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_LOWER)) <= ${value}`)}
  AND ${FILTER_PARAMS.bus_pms_unitAvailability.transactionDate.filter((value) =>
    `convert_timezone('UTC', timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_UPPER)) >= ${value}`)}
  AND occupancy_relationship.relationship_type_name IN ('Resident','Applicant')
  )
  , ACTIVE_OCCUPANCIES as (
  SELECT occupancy.business_unit_id
    ,occupancy.occupancy_id
    ,occupancy.unit_id
    ,occupancy_phase.occupancy_phase_index
    ,occupancy.household_move_in_date
    ,occupancy.start_date
    ,occupancy_phase.occupancy_phase_span
    ,TO_TIMESTAMP_NTZ(SUBSTRING(occupancy_phase_span, 3, 11)) AS lower_span
    ,CASE
      WHEN SUBSTRING(occupancy_phase.occupancy_phase_span, - 1) = ')'
        THEN dateadd(d, - 1, TO_TIMESTAMP_NTZ(SUBSTR(occupancy_phase_span, -21, 10)))
      ELSE TO_TIMESTAMP_NTZ(SUBSTR(occupancy_phase_span, -21, 10))
      END AS upper_span
    ,occupancy.household_move_out_date move_out_date
    ,occupancy_phase.market_rent_rate_at_start
    ,coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date
    ,lease_values_in_effect.rent_amount LEASE_RENT
    ,RESIDENT_LIST.RESIDENT
      ,RESIDENT_LIST.RESIDENT_TYPE
      ,occupancy.CURRENT_STATUS CURRENT_STATUS
      ,RESIDENT_LIST.valid_span
      ,occupancy_phase_span
  FROM ${raw_pmsleasing_occupancyPhase.sql()}  AS occupancy_phase
  JOIN ${raw_pmsleasing_occupancy.sql()} AS occupancy ON occupancy_phase.occupancy_id = occupancy.occupancy_id
  LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} AS lease_values_in_effect ON lease_values_in_effect.occupancy_id = occupancy_phase.occupancy_id
   AND lease_values_in_effect.occupancy_phase_index = occupancy_phase.occupancy_phase_index
  LEFT JOIN RESIDENT_LIST ON RESIDENT_LIST.occupancy_id = occupancy_phase.occupancy_id
  WHERE  (${FILTER_PARAMS.bus_pms_unitAvailability.businessUnitId.filter((value) => `occupancy_phase.business_unit_id = ${value}`)})
   AND ${FILTER_PARAMS.bus_pms_unitAvailability.transactionDate.filter((value) =>
      `TO_TIMESTAMP_NTZ(SUBS_SPAN_LOWER) <= ${value}`)}
      and case when SUBSTRING(occupancy_phase.occupancy_phase_span, -1) = ')'
      then dateadd(d, -1, TO_TIMESTAMP_NTZ(SUBS_SPAN_UPPER))
      else ${FILTER_PARAMS.bus_pms_unitAvailability.transactionDate.filter((value) =>
        `TO_TIMESTAMP_NTZ(SUBS_SPAN_UPPER) end >= ${value}`)}
  ),
  AMOUNT AS (SELECT SUM(ca.total) AMNT_RENT_TOTAL,
                    cal.location_id
             FROM ${raw_pmsamnt_commAmntLocations.sql()} cal
             LEFT JOIN${raw_pmsamnt_commAmnt.sql()} ca on cal.community_amenity_id = ca.id
             GROUP BY cal.location_id)
  SELECT
          us.name as AVAILABILITY_STATUS
         ,u.BUSINESS_UNIT_ID
         ,u.c_unit_name UNIT_NAME
         ,ut.name UNIT_TYPE
         ,to_char(ut.BEDROOM_NUM) || '/' || to_char(ut.BATHROOM_NUM) BED_BATH
         ,usi.square_footage AS SQFT
         ,ao.upper_span as LEASE_EXPIRATION_DATE
         ,case when ao.CURRENT_STATUS = 'VACANT'
            then DATEDIFF(day,ao.upper_span,current_date())
            else 0
          end DAYS_VACANT
         ,CASE WHEN usi.PHYSICAL_STATUS_STATUS_CODE='READY' THEN TRUE ELSE FALSE END READY
         ,CASE WHEN ao.CURRENT_STATUS = 'future' AND ao.move_in_date < CURRENT_DATE() AND RESIDENT_TYPE='Resident'
                   THEN ao.RESIDENT
               ELSE NULL
          END FUTURE_RESIDENT
         ,CASE WHEN ao.CURRENT_STATUS = 'current' AND ao.move_in_date > CURRENT_DATE() AND RESIDENT_TYPE='Resident'
                   THEN ao.RESIDENT
               ELSE NULL
          END CURRENT_RESIDENT
          ,CASE WHEN ao.CURRENT_STATUS = 'approved' AND ao.move_in_date < CURRENT_DATE() AND RESIDENT_TYPE='Applicant'
                   THEN ao.RESIDENT
               ELSE NULL
          END APLICANT
          ,ao.move_in_date MOVE_IN_DATE
          ,ao.move_out_date MOVE_OUT_DATE
          ,usi.base_rent + coalesce(amnt.AMNT_RENT_TOTAL, 0) as CURRENT_MARKET_RENT
          ,ao.LEASE_RENT
          ,a.name AMENITY_GROUP_NAME
          ,a.description AMENITIES
          ,  ${FILTER_PARAMS.bus_pms_unitAvailability.transactionDate.filter((value) => `${value}`)} as DATE
  FROM ${raw_pmsleasing_unit.sql()} AS u
  INNER JOIN ACTIVE_OCCUPANCIES ao on ao.BUSINESS_UNIT_ID = u.BUSINESS_UNIT_ID and ao.UNIT_ID  = u.UNIT_ID
  LEFT  JOIN  ${raw_pmscbr_unitSpecsInfo.sql()} usi on usi.unit_id = u.unit_id and usi.building_id is not null
  LEFT  JOIN ${raw_pmscbr_unitStatus.sql()} us on usi.current_occupancy_status_code = us.status_code and usi.current_occupancy_category_code = us.category_code
  LEFT  JOIN ${raw_pmscbr_unitTypes.sql()} ut on usi.unit_type_id = ut.id
  LEFT  JOIN AMOUNT amnt ON u.unit_id = amnt.location_id
  LEFT JOIN  ${raw_pmsamnt_commAmnt.sql()} ca ON ut.COMMUNITY_ID = ca.COMMUNITY_ID
  LEFT JOIN  ${raw_pmsamnt_Amnt.sql()} a on a.ID = ca.AMENITY_ID
  WHERE  (${FILTER_PARAMS.bus_pms_unitAvailability.businessUnitId.filter((value) => ` u.BUSINESS_UNIT_ID = ${value}`)})`,

  dimensions: {

    availabilityStatus: {
      sql: ` ${CUBE}."AVAILABILITY_STATUS"`,
      type: `string`,
      title: `Status`,
      meta: {
        styleType: 'string',
        show: false,
        size: 135,
        sortable: true,
        isGroupIdentifier: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: false
      },
    },

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`,
      title: `BusinessUnit`
    },

    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`,
      title: `Occupancy`,
      primaryKey: true
    },

    unitName: {
      sql: `${CUBE}."UNIT_NAME"`,
      type: `string`,
      title: `Unit`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 76,
        isGroupIdentifier: true
      }
    },

    unitType: {
      sql: `${CUBE}."UNIT_TYPE"`,
      type: `string`,
      title: `Unit type`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 112
      }
    },

    bedBath: {
      sql: `${CUBE}."BED_BATH"`,
      type: `string`,
      title: `Bed / Bath`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 104
      }
    },

    sqft: {
      sql: `${CUBE}."SQFT"`,
      type: `string`,
      title: `Sq. Feet`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 104
      }
    },

    availableDate: {
      sql: `${CUBE}."LEASE_EXPIRATION_DATE"`,
      type: `time`,
      title: `Available date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 101
      }
    },

    daysVacant: {
      sql: `${CUBE}."DAYS_VACANT"`,
      type: `number`,
      title: `Day vacant`,
      meta: {
        show: true,
        sortable: true,
        size: 101
      }
    },

    ready: {
      sql: `${CUBE}."READY"`,
      type: `string`,
      title: `Ready`,
      meta: {
        styleType: 'check',
        show: true,
        sortable: true,
        size: 104
      }
    },

    currentResident: {
      sql: `${CUBE}."CURRENT_RESIDENT"`,
      type: `string`,
      title: `Current resident`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },


    futureResident: {
      sql: `${CUBE}."FUTURE_RESIDENT"`,
      type: `string`,
      title: `Future resident`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },

    applicant: {
      sql: `${CUBE}."APLICANT"`,
      type: `string`,
      title: `Applicant`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },


    moveOutDate: {
      sql: `${CUBE}."MOVE_OUT_DATE"`,
      type: `time`,
      title: `Move out date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 112
      }
    },



    moveInDate: {
      sql: `${CUBE}."MOVE_IN_DATE"`,
      type: `time`,
      title: `Expected move in`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 112
      }
    },



    marketRent: {
      sql: `${CUBE}."CURRENT_MARKET_RENT"`,
      type: `string`,
      title: `Market rent + Addl.`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 89
      }
    },

    leaseRent: {
      sql: `${CUBE}."LEASE_RENT"`,
      type: `string`,
      title: `Lease rent`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 89
      }
    },

    amenityGroupName: {
      sql: `${CUBE}."AMENITY_GROUP_NAME"`,
      type: `string`,
      title: `Amenity group name`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },

    amenities: {
      sql: `${CUBE}."AMENITIES"`,
      type: `string`,
      title: `Amenities`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },

    transactionDate: {
      sql: `${CUBE}."DATE"`,
      type: `string`,
      title: `transactionDate`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true
      }
    },

},

segments: {

},

  dataSource: `snowflake_pms`

});