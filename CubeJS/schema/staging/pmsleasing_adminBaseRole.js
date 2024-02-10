cube(`stg_pmsleasing_adminBaseRole`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminBaseRole.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [baseRoleId, baseRoleName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    baseRoleId: {
      sql: `${CUBE}."BASE_ROLE_ID"`,
      type: `string`
    },
    
    baseRoleName: {
      sql: `${CUBE}."BASE_ROLE_NAME"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
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
