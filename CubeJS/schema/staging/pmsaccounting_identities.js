cube(`stg_pmsaccounting_identities`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_identities.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cognitoUserId, lastName, identityId, firstName, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    phone: {
      sql: `${CUBE}."PHONE"`,
      type: `string`
    },
    
    cognitoUserId: {
      sql: `${CUBE}."COGNITO_USER_ID"`,
      type: `string`
    },
    
    email: {
      sql: `${CUBE}."EMAIL"`,
      type: `string`
    },
    
    lastName: {
      sql: `${CUBE}."LAST_NAME"`,
      type: `string`
    },
    
    identityId: {
      sql: `${CUBE}."IDENTITY_ID"`,
      type: `string`
    },
    
    role: {
      sql: `${CUBE}."ROLE"`,
      type: `string`
    },
    
    isDeleted: {
      sql: `${CUBE}."IS_DELETED"`,
      type: `string`
    },
    
    firstName: {
      sql: `${CUBE}."FIRST_NAME"`,
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
