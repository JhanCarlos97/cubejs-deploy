cube(`stg_pmsleasing_adminCustomerUserHasRoleForCustomerGlobally`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminCustomerUserHasRoleForCustomerGlobally.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [userId, customerRoleId, customerId, createdAt, validFrom]
    }
  },
  
  dimensions: {
    userId: {
      sql: `${CUBE}."USER_ID"`,
      type: `string`
    },
    
    customerRoleId: {
      sql: `${CUBE}."CUSTOMER_ROLE_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
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
