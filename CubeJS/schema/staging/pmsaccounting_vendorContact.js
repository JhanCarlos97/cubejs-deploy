cube(`stg_pmsaccounting_vendorContact`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorContact.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [vendorContactId, lastName, firstName, vendorId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    phoneNumber: {
      sql: `${CUBE}."PHONE_NUMBER"`,
      type: `string`
    },
    
    email: {
      sql: `${CUBE}."EMAIL"`,
      type: `string`
    },
    
    vendorContactId: {
      sql: `${CUBE}."VENDOR_CONTACT_ID"`,
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
    
    position: {
      sql: `${CUBE}."POSITION"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    faxNumber: {
      sql: `${CUBE}."FAX_NUMBER"`,
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
