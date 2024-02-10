cube(`stg_pmsleasing_partyCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_partyCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customTagName, customerId, businessUnitId]
    }
  },
  
  dimensions: {
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
