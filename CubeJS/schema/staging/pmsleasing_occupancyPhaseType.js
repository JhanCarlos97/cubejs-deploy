cube(`stg_pmsleasing_occupancyPhaseType`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyPhaseType.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [occupancyPhaseTypeName]
    }
  },
  
  dimensions: {
    occupancyPhaseTypeName: {
      sql: `${CUBE}."OCCUPANCY_PHASE_TYPE_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
