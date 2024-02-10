cube(`stg_pmsleasing_adminBaseRoleHasPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminBaseRoleHasPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [baseRoleId, permissionGroupName, permissionName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    baseRoleId: {
      sql: `${CUBE}."BASE_ROLE_ID"`,
      type: `string`
    },
    
    permissionGroupName: {
      sql: `${CUBE}."PERMISSION_GROUP_NAME"`,
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
    
    validFrom: {
      sql: `${CUBE}."VALID_FROM"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
