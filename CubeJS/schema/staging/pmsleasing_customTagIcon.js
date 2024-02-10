cube(`stg_pmsleasing_customTagIcon`, {
  sql: `SELECT * FROM ${raw_pmsleasing_customTagIcon.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    }
  },
  
  dimensions: {
    customTagIconUri: {
      sql: `${CUBE}."CUSTOM_TAG_ICON_URI"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
