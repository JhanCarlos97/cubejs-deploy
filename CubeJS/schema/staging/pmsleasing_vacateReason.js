cube(`stg_pmsleasing_vacateReason`, {
  sql: `SELECT * FROM ${raw_pmsleasing_vacateReason.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [vacateReasonName]
    }
  },
  
  dimensions: {
    vacateReasonName: {
      sql: `${CUBE}."VACATE_REASON_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
