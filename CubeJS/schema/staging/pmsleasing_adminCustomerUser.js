cube(`stg_pmsleasing_adminCustomerUser`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminCustomerUser.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, userId, customerUserId, createdAt, validFrom]
    }
  },
  
  dimensions: {
    inheritsNewCommunity: {
      sql: `${CUBE}."INHERITS_NEW_COMMUNITY"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    userId: {
      sql: `${CUBE}."USER_ID"`,
      type: `string`
    },
    
    customerUserId: {
      sql: `${CUBE}."CUSTOMER_USER_ID"`,
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
