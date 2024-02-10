cube(`stg_pmsleasing_customer`, {
  sql: `SELECT * FROM ${raw_pmsleasing_customer.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cCustomerDisplayName, customerId, createdAt]
    },
    
    cPhoneNumber: {
      sql: `${CUBE}."C_PHONE_NUMBER"`,
      type: `sum`
    }
  },
  
  dimensions: {
    cCustomerDisplayName: {
      sql: `${CUBE}."C_CUSTOMER_DISPLAY_NAME"`,
      type: `string`
    },
    
    cEmail: {
      sql: `${CUBE}."C_EMAIL"`,
      type: `string`
    },
    
    cLogoFileLocation: {
      sql: `${CUBE}."C_LOGO_FILE_LOCATION"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    isActive: {
      sql: `${CUBE}."IS_ACTIVE"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    disabledAt: {
      sql: `${CUBE}."DISABLED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
