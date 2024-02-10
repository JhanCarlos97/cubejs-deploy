cube(`stg_pmsaccounting_userRolesPermissions`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_userRolesPermissions.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [permissionId, roleId, userRolesPermissionsId]
    }
  },
  
  dimensions: {
    permissionId: {
      sql: `${CUBE}."PERMISSION_ID"`,
      type: `string`
    },
    
    roleId: {
      sql: `${CUBE}."ROLE_ID"`,
      type: `string`
    },
    
    userRolesPermissionsId: {
      sql: `${CUBE}."USER_ROLES_PERMISSIONS_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
