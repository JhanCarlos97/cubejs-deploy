cube(`stg_pmsaccounting_industry`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_industry.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [industryId, industryName, createdDate, updatedDate]
    }
  },
  
  dimensions: {
    industryId: {
      sql: `${CUBE}."INDUSTRY_ID"`,
      type: `string`
    },
    
    industryName: {
      sql: `${CUBE}."INDUSTRY_NAME"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
