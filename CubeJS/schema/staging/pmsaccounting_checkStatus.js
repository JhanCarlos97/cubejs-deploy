cube(`stg_pmsaccounting_checkStatus`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_checkStatus.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [checkStatusId, checkId, createdBy, createdDate]
    }
  },
  
  dimensions: {
    checkStatusId: {
      sql: `${CUBE}."CHECK_STATUS_ID"`,
      type: `string`
    },
    
    checkId: {
      sql: `${CUBE}."CHECK_ID"`,
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
