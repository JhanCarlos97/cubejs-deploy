cube(`stg_pmsleasing_customerActive`, {
  sql: `SELECT * FROM ${raw_pmsleasing_customerActive.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId]
    }
  },
  
  dimensions: {
    activePeriod: {
      sql: `${CUBE}."ACTIVE_PERIOD"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
