cube(`stg_pmsaccounting_vendorContract`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorContract.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [vendorId, vendorContractId, createdAt, updatedAt, startDate, expirationDate]
    }
  },
  
  dimensions: {
    autoRenew: {
      sql: `${CUBE}."AUTO_RENEW"`,
      type: `string`
    },
    
    type: {
      sql: `${CUBE}."TYPE"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    vendorContractId: {
      sql: `${CUBE}."VENDOR_CONTRACT_ID"`,
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
    
    startDate: {
      sql: `${CUBE}."START_DATE"`,
      type: `time`
    },
    
    expirationDate: {
      sql: `${CUBE}."EXPIRATION_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
