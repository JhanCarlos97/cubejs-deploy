cube(`stg_pmsleasing_customerSummary`, {
  sql: `SELECT * FROM ${raw_pmsleasing_customerSummary.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cCustomerDisplayName, customerId]
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
    
    currentlyActive: {
      sql: `${CUBE}."CURRENTLY_ACTIVE"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    cLogoFileLocation: {
      sql: `${CUBE}."C_LOGO_FILE_LOCATION"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
