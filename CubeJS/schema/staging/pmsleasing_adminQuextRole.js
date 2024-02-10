cube(`stg_pmsleasing_admincompanyRole`, {
  sql: `SELECT * FROM ${raw_pmsleasing_admincompanyRole.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [companyRoleName, companyRoleId, createdAt, validFrom]
    }
  },
  
  dimensions: {
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    companyRoleName: {
      sql: `${CUBE}."company_ROLE_NAME"`,
      type: `string`
    },
    
    companyRoleId: {
      sql: `${CUBE}."company_ROLE_ID"`,
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
