cube(`stg_pmsleasing_renewalOfferLetter`, {
  sql: `SELECT * FROM ${raw_pmsleasing_renewalOfferLetter.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, businessUnitId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    paragraphs: {
      sql: `${CUBE}."PARAGRAPHS"`,
      type: `string`
    },
    
    header: {
      sql: `${CUBE}."HEADER"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
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
