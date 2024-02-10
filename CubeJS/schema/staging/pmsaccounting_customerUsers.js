cube(`stg_pmsaccounting_customerUsers`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_customerUsers.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [lastName, customerUserId, identityId, firstName, customerId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    lastName: {
      sql: `${CUBE}."LAST_NAME"`,
      type: `string`
    },
    
    isDeleted: {
      sql: `${CUBE}."IS_DELETED"`,
      type: `string`
    },
    
    customerUserId: {
      sql: `${CUBE}."CUSTOMER_USER_ID"`,
      type: `string`
    },
    
    identityId: {
      sql: `${CUBE}."IDENTITY_ID"`,
      type: `string`
    },
    
    firstName: {
      sql: `${CUBE}."FIRST_NAME"`,
      type: `string`
    },
    
    email: {
      sql: `${CUBE}."EMAIL"`,
      type: `string`
    },
    
    phone: {
      sql: `${CUBE}."PHONE"`,
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
