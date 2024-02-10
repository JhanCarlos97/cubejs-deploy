cube(`stg_pmsleasing_adminUser`, {
  sql: `SELECT * FROM ${raw_pmsleasing_adminUser.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [userId, cognitoIdentityId, lastName, firstName, createdAt, validThrough, validFrom]
    }
  },
  
  dimensions: {
    userId: {
      sql: `${CUBE}."USER_ID"`,
      type: `string`
    },
    
    cognitoIdentityId: {
      sql: `${CUBE}."COGNITO_IDENTITY_ID"`,
      type: `string`
    },
    
    lastName: {
      sql: `${CUBE}."LAST_NAME"`,
      type: `string`
    },
    
    firstName: {
      sql: `${CUBE}."FIRST_NAME"`,
      type: `string`
    },
    
    emailAddress: {
      sql: `${CUBE}."EMAIL_ADDRESS"`,
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
    
    validThrough: {
      sql: `${CUBE}."VALID_THROUGH"`,
      type: `time`
    },
    
    validFrom: {
      sql: `${CUBE}."VALID_FROM"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
