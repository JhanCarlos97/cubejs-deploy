cube(`stg_pmsleasing_occupancyStatus`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyStatus.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [occupancyStatusName]
    }
  },
  
  dimensions: {
    occupancyStatusName: {
      sql: `${CUBE}."OCCUPANCY_STATUS_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
