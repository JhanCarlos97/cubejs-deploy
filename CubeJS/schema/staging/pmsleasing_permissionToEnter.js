cube(`stg_pmsleasing_permissionToEnter`, {
  sql: `SELECT * FROM ${raw_pmsleasing_permissionToEnter.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, customerId, pteName, partyId]
    }
  },
  
  dimensions: {
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    pteRelationship: {
      sql: `${CUBE}."PTE_RELATIONSHIP"`,
      type: `string`
    },
    
    pteName: {
      sql: `${CUBE}."PTE_NAME"`,
      type: `string`
    },
    
    ptePhone: {
      sql: `${CUBE}."PTE_PHONE"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
