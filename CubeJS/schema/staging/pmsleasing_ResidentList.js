cube(`stg_pmsleasing_residentList`, {
    sql: `SELECT * FROM ${raw_pmsleasing_occupancyRelationship.sql()}`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },

    joins: {

        raw_pmsleasing_party: {
            sql: `${stg_pmsleasing_residentList}."PARTY_ID"= ${raw_pmsleasing_party}."PARTY_ID"`,
            relationship: `hasMany`}, 
        },    
  
    
    dimensions: {
      customerId: {
        sql: `${CUBE}."CUSTOMER_ID"`,
        type: `string`
      },
      
      businessUnitId: {
        sql: `${CUBE}."BUSINESS_UNIT_ID"`,
        type: `string`
      },
      
      occupancyId: {
        sql: `${CUBE}."OCCUPANCY_ID"`,
        type: `string`
      },

      validSpan: {
        sql: `${CUBE}."VALID_SPAN"`,
        type: `string`
      },
      
      residents: {
        sql: `string_agg(${raw_pmsleasing_party.fullName},', ')`,
        type: `string`
      },
      
     
    },
    
    segments: {
      list_check: {
        sql: `${CUBE}."RELATIONSHIP_TYPE_NAME" = 'Resident'`,
      },
    },
    
    dataSource: `snowflake_pms`
  });
  
  cube(`stg_pmsleasing__activeOccupancies`, {
    sql: `SELECT * FROM ${raw_pmsleasing_occupancyPhase.sql()}`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },

    joins: {

        raw_pmsleasing_occupancy: {
            sql: `${stg_pmsleasing__activeOccupancies}."CUSTOMER_ID"= ${raw_pmsleasing_occupancy}."CUSTOMER_ID"
                    AND ${stg_pmsleasing__activeOccupancies}."BUSINESS_UNIT_ID"= ${raw_pmsleasing_occupancy}."BUSINESS_UNIT_ID"
                    AND ${stg_pmsleasing__activeOccupancies}."OCCUPANCY_ID"= ${raw_pmsleasing_occupancy}."OCCUPANCY_ID"    
                    `,
            relationship: `hasMany`}, 

        raw_pmsleasing_leaseValuesInEffect: {
            sql: `${stg_pmsleasing__activeOccupancies}."CUSTOMER_ID"= ${raw_pmsleasing_leaseValuesInEffect}."CUSTOMER_ID"
                    AND ${stg_pmsleasing__activeOccupancies}."BUSINESS_UNIT_ID"= ${raw_pmsleasing_occupancy}."BUSINESS_UNIT_ID"
                    AND ${stg_pmsleasing__activeOccupancies}."OCCUPANCY_ID"= ${raw_pmsleasing_occupancy}."OCCUPANCY_ID"
                    AND ${stg_pmsleasing__activeOccupancies}."OCCUPANCY_PHASE_INDEX"= ${raw_pmsleasing_occupancy}."OCCUPANCY_PHASE_INDEX"
                    `,
            relationship: `hasMany`},
            
        stg_pmsleasing_residentList: {
            sql: `${stg_pmsleasing__activeOccupancies}."CUSTOMER_ID"= ${stg_pmsleasing_residentList.customerId}
                   AND ${stg_pmsleasing__activeOccupancies}."BUSINESS_UNIT_ID"= ${stg_pmsleasing_residentList.businessUnitId}
                   AND ${stg_pmsleasing__activeOccupancies}."OCCUPANCY_ID"= ${stg_pmsleasing_residentList.occupancyId}          
                    `,
            relationship: `hasMany`},    
        },    
  
    
    dimensions: {
      customerId: {
        sql: `${CUBE}."CUSTOMER_ID"`,
        type: `string`
      },
      
      business_unit_id: {
        sql: `${CUBE}."BUSINESS_UNIT_ID"`,
        type: `string`
      },
      
      occupancyId: {
        sql: `${CUBE}."OCCUPANCY_ID"`,
        type: `string`
      },

      validSpan: {
        sql: `${CUBE}."VALID_SPAN"`,
        type: `string`
      },
      
      residents: {
        sql: `${stg_pmsleasing_residentList.residents}`,
        type: `string`
      },      
     
    },
    
    dataSource: `snowflake_pms`
  });