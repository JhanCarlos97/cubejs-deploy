cube(`stg_pmsleasing_partyAssociation`, {
  sql: `SELECT * FROM ${raw_pmsleasing_partyAssociation.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [primaryPartyId, businessUnitId, associatedPartyId, customerId]
    }
  },
  
  dimensions: {
    primaryPartyId: {
      sql: `${CUBE}."PRIMARY_PARTY_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    associatedPartyId: {
      sql: `${CUBE}."ASSOCIATED_PARTY_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
