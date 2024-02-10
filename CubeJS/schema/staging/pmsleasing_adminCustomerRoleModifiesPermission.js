cube(`stg_pmsleasing_adminCustomerRoleModifiesPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminCustomerRoleModifiesPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [permissionGroupName, customerRoleId, permissionName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    modifiedPermissionValue: {
      sql: `${CUBE}."MODIFIED_PERMISSION_VALUE"`,
      type: `string`
    },
    
    permissionGroupName: {
      sql: `${CUBE}."PERMISSION_GROUP_NAME"`,
      type: `string`
    },
    
    customerRoleId: {
      sql: `${CUBE}."CUSTOMER_ROLE_ID"`,
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
