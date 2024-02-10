cube(`stg_pmsleasing_renewal`, {
  sql: `SELECT * FROM ${raw_pmsleasing_renewal.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [renewalUuid]
    }
  },
  
  dimensions: {
    fee: {
      sql: `${CUBE}."FEE"`,
      type: `string`
    },
    
    renewalUuid: {
      sql: `${CUBE}."RENEWAL_UUID"`,
      type: `string`
    },
    
    additionalInformation: {
      sql: `${CUBE}."ADDITIONAL_INFORMATION"`,
      type: `string`
    },
    
    status: {
      sql: `${CUBE}."STATUS"`,
      type: `string`
    },
    
    rent: {
      sql: `${CUBE}."RENT"`,
      type: `string`
    },
    
    extendRenewalOffer: {
      sql: `${CUBE}."EXTEND_RENEWAL_OFFER"`,
      type: `string`
    },
    
    requireApplication: {
      sql: `${CUBE}."REQUIRE_APPLICATION"`,
      type: `string`
    },
    
    reason: {
      sql: `${CUBE}."REASON"`,
      type: `string`
    },
    
    acceptedOffer: {
      sql: `${CUBE}."ACCEPTED_OFFER"`,
      type: `string`
    },
    
    type: {
      sql: `${CUBE}."TYPE"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
