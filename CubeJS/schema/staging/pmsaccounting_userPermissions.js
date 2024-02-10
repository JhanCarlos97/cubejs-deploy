cube(`stg_pmsaccounting_userPermissions`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_userPermissions.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [permissionId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    allowedValues: {
      sql: `${CUBE}."ALLOWED_VALUES"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    isSupportedByCustomRoles: {
      sql: `${CUBE}."IS_SUPPORTED_BY_CUSTOM_ROLES"`,
      type: `string`
    },
    
    permissionId: {
      sql: `${CUBE}."PERMISSION_ID"`,
      type: `string`
    },
    
    type: {
      sql: `${CUBE}."TYPE"`,
      type: `string`
    },
    
    value: {
      sql: `${CUBE}."VALUE"`,
      type: `string`
    },
    
    isDeleted: {
      sql: `${CUBE}."IS_DELETED"`,
      type: `string`
    },
    
    alias: {
      sql: `${CUBE}."ALIAS"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    deletedAt: {
      sql: `${CUBE}."DELETED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
