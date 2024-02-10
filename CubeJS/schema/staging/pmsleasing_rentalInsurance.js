cube(`stg_pmsleasing_rentalInsurance`, {
  sql: `SELECT * FROM ${raw_pmsleasing_rentalInsurance.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [insuredName, rentalInsurancePolicyId, carrierName, businessUnitId, partyId, customerId]
    }
  },
  
  dimensions: {
    policyStatus: {
      sql: `${CUBE}."POLICY_STATUS"`,
      type: `string`
    },
    
    insuredName: {
      sql: `${CUBE}."INSURED_NAME"`,
      type: `string`
    },
    
    documentImageUri: {
      sql: `${CUBE}."DOCUMENT_IMAGE_URI"`,
      type: `string`
    },
    
    policyType: {
      sql: `${CUBE}."POLICY_TYPE"`,
      type: `string`
    },
    
    rentalInsurancePolicyId: {
      sql: `${CUBE}."RENTAL_INSURANCE_POLICY_ID"`,
      type: `string`
    },
    
    carrierName: {
      sql: `${CUBE}."CARRIER_NAME"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    policyNumber: {
      sql: `${CUBE}."POLICY_NUMBER"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    policyStart: {
      sql: `${CUBE}."POLICY_START"`,
      type: `time`
    },
    
    policyExpiration: {
      sql: `${CUBE}."POLICY_EXPIRATION"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
