cube(`stg_pmsleasing_admincompanyRoleHasPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_admincompanyRoleHasPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [companyRoleId, permissionName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    companyRoleId: {
      sql: `${CUBE}."company_ROLE_ID"`,
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
