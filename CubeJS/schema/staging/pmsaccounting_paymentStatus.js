cube(`stg_pmsaccounting_paymentStatus`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_paymentStatus.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [paymentId, id, createdAt]
    }
  },
  
  dimensions: {
    statusDetails: {
      sql: `${CUBE}."STATUS_DETAILS"`,
      type: `string`
    },
    
    paymentId: {
      sql: `${CUBE}."PAYMENT_ID"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
