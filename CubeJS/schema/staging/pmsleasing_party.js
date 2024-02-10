cube(`stg_pmsleasing_party`, {
  sql: `SELECT * FROM ${raw_pmsleasing_party.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [contactId, partyId, cFamilyName, customerId, businessUnitId, cGivenName, partyApplicationDate, partyMoveInDate, partyMoveOutDate]
    }
  },
  
  dimensions: {
    contactId: {
      sql: `${CUBE}."CONTACT_ID"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    cFamilyName: {
      sql: `${CUBE}."C_FAMILY_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    cGivenName: {
      sql: `${CUBE}."C_GIVEN_NAME"`,
      type: `string`
    },
    
    partyApplicationDate: {
      sql: `${CUBE}."PARTY_APPLICATION_DATE"`,
      type: `time`
    },
    
    partyMoveInDate: {
      sql: `${CUBE}."PARTY_MOVE_IN_DATE"`,
      type: `time`
    },
    
    partyMoveOutDate: {
      sql: `${CUBE}."PARTY_MOVE_OUT_DATE"`,
      type: `time`
    },

    fullname: {
      sql: `${CUBE}."FULLNAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
