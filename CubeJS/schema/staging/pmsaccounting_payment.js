cube(`stg_pmsaccounting_payment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_payment.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [depositId, paymentId, accountId, transactionId, createdAt, updatedAt, paymentDate]
    }
  },
  
  dimensions: {
    paymentAmount: {
      sql: `${CUBE}."PAYMENT_AMOUNT"`,
      type: `string`
    },
    
    paymentMethodType: {
      sql: `${CUBE}."PAYMENT_METHOD_TYPE"`,
      type: `string`
    },
    
    depositId: {
      sql: `${CUBE}."DEPOSIT_ID"`,
      type: `string`
    },
    
    accrualAmount: {
      sql: `${CUBE}."ACCRUAL_AMOUNT"`,
      type: `string`
    },
    
    paymentCurrency: {
      sql: `${CUBE}."PAYMENT_CURRENCY"`,
      type: `string`
    },
    
    paymentId: {
      sql: `${CUBE}."PAYMENT_ID"`,
      type: `string`
    },
    
    accountId: {
      sql: `${CUBE}."ACCOUNT_ID"`,
      type: `string`
    },
    
    transactionId: {
      sql: `${CUBE}."TRANSACTION_ID"`,
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
    
    paymentDate: {
      sql: `${CUBE}."PAYMENT_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
