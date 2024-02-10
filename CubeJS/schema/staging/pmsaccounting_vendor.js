cube(`stg_pmsaccounting_vendor`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendor.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [dbaName, isConsolidatedPayment, vendorName, customerId, updatedBy, country, city, createdBy, vendorId, industryId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    dbaName: {
      sql: `${CUBE}."DBA_NAME"`,
      type: `string`
    },
    
    phone: {
      sql: `${CUBE}."PHONE"`,
      type: `string`
    },
    
    isServicedAllProperties: {
      sql: `${CUBE}."IS_SERVICED_ALL_PROPERTIES"`,
      type: `string`
    },
    
    isConsolidatedPayment: {
      sql: `${CUBE}."IS_CONSOLIDATED_PAYMENT"`,
      type: `string`
    },
    
    vendorName: {
      sql: `${CUBE}."VENDOR_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    status: {
      sql: `${CUBE}."STATUS"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    country: {
      sql: `${CUBE}."COUNTRY"`,
      type: `string`
    },
    
    street1: {
      sql: `${CUBE}."STREET1"`,
      type: `string`
    },
    
    ext: {
      sql: `${CUBE}."EXT"`,
      type: `string`
    },
    
    city: {
      sql: `${CUBE}."CITY"`,
      type: `string`
    },
    
    street2: {
      sql: `${CUBE}."STREET2"`,
      type: `string`
    },
    
    zip: {
      sql: `${CUBE}."ZIP"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    industryId: {
      sql: `${CUBE}."INDUSTRY_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
