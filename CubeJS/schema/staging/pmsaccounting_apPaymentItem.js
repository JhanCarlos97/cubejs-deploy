cube(`stg_pmsaccounting_apPaymentItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_apPaymentItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [apPaymentItemId, apPaymentId, invoiceItemId]
    }
  },
  
  dimensions: {
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    apPaymentItemId: {
      sql: `${CUBE}."AP_PAYMENT_ITEM_ID"`,
      type: `string`
    },
    
    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`
    },
    
    invoiceItemId: {
      sql: `${CUBE}."INVOICE_ITEM_ID"`,
      type: `string`
    },

  },
  
  dataSource: `snowflake_pms`
});
