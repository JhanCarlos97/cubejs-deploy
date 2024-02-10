cube(`stg_pmsleasing_adminCustomerRole`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminCustomerRole.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, baseRoleId, customerRoleId, customerRoleName, createdAt, validFrom]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    baseRoleId: {
      sql: `${CUBE}."BASE_ROLE_ID"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    customerRoleId: {
      sql: `${CUBE}."CUSTOMER_ROLE_ID"`,
      type: `string`
    },
    
    customerRoleName: {
      sql: `${CUBE}."CUSTOMER_ROLE_NAME"`,
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
