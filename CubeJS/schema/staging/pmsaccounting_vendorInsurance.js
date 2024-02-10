cube(`stg_pmsaccounting_vendorInsurance`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorInsurance.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [carrierName, vendorInsuranceId, vendorId, createdAt, updatedAt, expirationDate, startDate]
    }
  },
  
  dimensions: {
    type: {
      sql: `${CUBE}."TYPE"`,
      type: `string`
    },
    
    coverageTerm: {
      sql: `${CUBE}."COVERAGE_TERM"`,
      type: `string`
    },
    
    carrierName: {
      sql: `${CUBE}."CARRIER_NAME"`,
      type: `string`
    },
    
    policyNumber: {
      sql: `${CUBE}."POLICY_NUMBER"`,
      type: `string`
    },
    
    vendorInsuranceId: {
      sql: `${CUBE}."VENDOR_INSURANCE_ID"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    is24Hours: {
      sql: `${CUBE}."IS_24_HOURS"`,
      type: `string`,
      title: `Is 24 Hours`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    expirationDate: {
      sql: `${CUBE}."EXPIRATION_DATE"`,
      type: `time`
    },
    
    startDate: {
      sql: `${CUBE}."START_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
