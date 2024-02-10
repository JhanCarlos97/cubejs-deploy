cube(`stg_pmsaccounting_check`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_check.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [updatedBy, customerId, createdBy, bankAccountId, apPaymentId, attachmentId, checkId, payeeName, createdDate, updatedDate, checkDate]
    }
  },
  
  dimensions: {
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    checkNo: {
      sql: `${CUBE}."CHECK_NO"`,
      type: `string`
    },
    
    payer: {
      sql: `${CUBE}."PAYER"`,
      type: `string`
    },
    
    bankAccountId: {
      sql: `${CUBE}."BANK_ACCOUNT_ID"`,
      type: `string`
    },
    
    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`
    },
    
    attachmentId: {
      sql: `${CUBE}."ATTACHMENT_ID"`,
      type: `string`
    },
    
    notes: {
      sql: `${CUBE}."NOTES"`,
      type: `string`
    },
    
    checkId: {
      sql: `${CUBE}."CHECK_ID"`,
      type: `string`
    },
    
    payeeName: {
      sql: `${CUBE}."PAYEE_NAME"`,
      type: `string`
    },
    
    status: {
      sql: `${CUBE}."STATUS"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    },
    
    checkDate: {
      sql: `${CUBE}."CHECK_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
