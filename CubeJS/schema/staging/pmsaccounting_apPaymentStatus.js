cube(`stg_pmsaccounting_apPaymentStatus`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_apPaymentStatus.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [apPaymentStatusId, apPaymentId, createdBy, createdDate]
    }
  },
  
  dimensions: {
    apPaymentStatusId: {
      sql: `${CUBE}."AP_PAYMENT_STATUS_ID"`,
      type: `string`
    },
    
    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
