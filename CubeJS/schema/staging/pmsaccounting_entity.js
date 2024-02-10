cube(`stg_pmsaccounting_entity`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_entity.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [accountId, businessUnitId, createdAt]
    }
  },
  
  dimensions: {
    accountId: {
      sql: `${CUBE}."ACCOUNT_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
