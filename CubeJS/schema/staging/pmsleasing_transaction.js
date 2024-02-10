cube(`stg_pmsleasing_transaction`, {
  sql: `SELECT * FROM ${raw_pmsleasing_transaction.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [overrideReason, hasOverride, customerId, occupancyId, businessUnitId, transactionId, endDate, startDate]
    }
  },
  
  dimensions: {
    frequency: {
      sql: `${CUBE}."FREQUENCY"`,
      type: `string`
    },
    
    shouldProrate: {
      sql: `${CUBE}."SHOULD_PRORATE"`,
      type: `string`
    },
    
    chargeCode: {
      sql: `${CUBE}."CHARGE_CODE"`,
      type: `string`
    },
    
    overrideReason: {
      sql: `${CUBE}."OVERRIDE_REASON"`,
      type: `string`
    },
    
    hasOverride: {
      sql: `${CUBE}."HAS_OVERRIDE"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    transactionId: {
      sql: `${CUBE}."TRANSACTION_ID"`,
      type: `string`
    },
    
    isCredit: {
      sql: `${CUBE}."IS_CREDIT"`,
      type: `string`
    },
    
    endDate: {
      sql: `${CUBE}."END_DATE"`,
      type: `time`
    },
    
    startDate: {
      sql: `${CUBE}."START_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
