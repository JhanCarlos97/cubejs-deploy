cube(`stg_pmsleasing_nonRenewalReason`, {
  sql: `SELECT * FROM ${raw_pmsleasing_nonRenewalReason.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [nonRenewalReasonName]
    }
  },
  
  dimensions: {
    nonRenewalReasonName: {
      sql: `${CUBE}."NON_RENEWAL_REASON_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
