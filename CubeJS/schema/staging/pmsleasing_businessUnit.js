cube(`stg_pmsleasing_businessUnit`, {
  sql: `SELECT * FROM ${raw_pmsleasing_businessUnit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cCommunityShortName, businessUnitId, cCity, cBusinessUnitDisplayName, timezoneId, customerId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    cCommunityShortName: {
      sql: `${CUBE}."C_COMMUNITY_SHORT_NAME"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    longitude: {
      sql: `${CUBE}."LONGITUDE"`,
      type: `string`
    },
    
    cCity: {
      sql: `${CUBE}."C_CITY"`,
      type: `string`
    },
    
    cEmail: {
      sql: `${CUBE}."C_EMAIL"`,
      type: `string`
    },
    
    latitude: {
      sql: `${CUBE}."LATITUDE"`,
      type: `string`
    },
    
    cBusinessUnitDisplayName: {
      sql: `${CUBE}."C_BUSINESS_UNIT_DISPLAY_NAME"`,
      type: `string`
    },
    
    cState: {
      sql: `${CUBE}."C_STATE"`,
      type: `string`
    },
    
    smsPhoneNumber: {
      sql: `${CUBE}."SMS_PHONE_NUMBER"`,
      type: `string`
    },
    
    timezoneId: {
      sql: `${CUBE}."TIMEZONE_ID"`,
      type: `string`
    },
    
    cPostalCode: {
      sql: `${CUBE}."C_POSTAL_CODE"`,
      type: `string`
    },
    
    cPhoneNumber: {
      sql: `${CUBE}."C_PHONE_NUMBER"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    cAddress: {
      sql: `${CUBE}."C_ADDRESS"`,
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
    
    disabledAt: {
      sql: `${CUBE}."DISABLED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
