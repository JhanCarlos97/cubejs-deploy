cube(`stg_pmsaccounting_temporaryLateFeesBusinessUnits`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_temporaryLateFeesBusinessUnits.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [temporaryLateFeeId, businessUnitId]
    }
  },
  
  dimensions: {
    temporaryLateFeeId: {
      sql: `${CUBE}."TEMPORARY_LATE_FEE_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
