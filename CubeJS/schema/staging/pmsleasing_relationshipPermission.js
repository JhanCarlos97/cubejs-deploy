cube(`stg_pmsleasing_relationshipPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_relationshipPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [relationshipPermissionName]
    }
  },
  
  dimensions: {
    relationshipPermissionName: {
      sql: `${CUBE}."RELATIONSHIP_PERMISSION_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
