cube(`stg_pmsleasing_adminPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [permissionGroupName, permissionName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    permissionGroupName: {
      sql: `${CUBE}."PERMISSION_GROUP_NAME"`,
      type: `string`
    },
    
    permissionDescription: {
      sql: `${CUBE}."PERMISSION_DESCRIPTION"`,
      type: `string`
    },
    
    permissionName: {
      sql: `${CUBE}."PERMISSION_NAME"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    disabledAt: {
      sql: `${CUBE}."DISABLED_AT"`,
      type: `time`
    },
    
    validFrom: {
      sql: `${CUBE}."VALID_FROM"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
