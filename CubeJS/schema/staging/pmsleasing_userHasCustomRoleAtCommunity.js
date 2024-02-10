cube(`stg_pmsleasing_userHasCustomRoleAtCommunity`, {
  sql: `SELECT * FROM ${raw_pmsleasing_userHasCustomRoleAtCommunity.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerRoleId, userId, customerId, communityId, createdAt, validFrom]
    }
  },
  
  dimensions: {
    customerRoleId: {
      sql: `${CUBE}."CUSTOMER_ROLE_ID"`,
      type: `string`
    },
    
    userId: {
      sql: `${CUBE}."USER_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
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
