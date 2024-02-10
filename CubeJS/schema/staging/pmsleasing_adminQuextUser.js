cube(`stg_pmsleasing_admincompanyUser`, {
  sql: `SELECT * FROM ${raw_pmsleasing_admincompanyUser.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [userId, createdAt, validThrough, validFrom]
    }
  },
  
  dimensions: {
    userId: {
      sql: `${CUBE}."USER_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    validThrough: {
      sql: `${CUBE}."VALID_THROUGH"`,
      type: `time`
    },
    
    validFrom: {
      sql: `${CUBE}."VALID_FROM"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
