cube(`stg_pmsleasing_adminPermissionGroup`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminPermissionGroup.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [permissionGroupName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    permissionGroupName: {
      sql: `${CUBE}."PERMISSION_GROUP_NAME"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    validFrom: {
      sql: `${CUBE}."VALID_FROM"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
