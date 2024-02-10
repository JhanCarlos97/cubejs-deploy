cube(`stg_pmsleasing_occupancyRelationship`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyRelationship.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pmsleasing_party: {
      sql: `${stg_pmsleasing_occupancyRelationship.partyId} = ${stg_pmsleasing_party.partyId}`,
      relationship: `hasOne`
    },
    
    raw_pmsauth_communities: {
      sql: `${stg_pmsleasing_occupancyRelationship.businessUnitId} = ${raw_pmsauth_communities}.id`,
      relationship: `hasOne`
    },

  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [relationshipTypeName, businessUnitId, partyId, customerId, validSpan, occupancyId]
    },

    residents: {
      sql: `listagg(${stg_pmsleasing_party.fullname},', ') WITHIN GROUP (ORDER BY ${stg_pmsleasing_party.fullname})`,
      type: `number`
    },

  },
  
  dimensions: {
    relationshipTypeName: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    validSpan: {
      sql: `${CUBE}."VALID_SPAN"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`,
      primaryKey: true
    },

    orLowerSpan: {
      sql: `convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_LOWER"))`,
      type: `time`
    },

    orLowerSpanMonth: {
      sql: `date_trunc('month', ${CUBE.orLowerSpan})`,
      type: `string`
    },

    orUpperSpan: {
      sql: `case when SUBSTRING(${CUBE}."VALID_SPAN", -1) = ')' 
    then dateadd(d, -1, convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_UPPER"))) 
        else convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_UPPER")) end`,
        type: `time`
      },

    orUpperSpanMonth: {
      sql: `date_trunc('month', ${CUBE.orUpperSpan})`,
      type: `string`
    },
  },
  
  segments: {
    isResident: {
        sql: `${CUBE.relationshipTypeName} ='Resident'`
    }
  },

  dataSource: `snowflake_pms`
});
