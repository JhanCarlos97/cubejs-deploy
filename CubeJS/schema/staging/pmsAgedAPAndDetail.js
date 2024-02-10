cube(`stg_pms_credit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_credit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    raw_pmsaccounting_voidCredit: {
        sql: `${stg_pms_credit}."CREDIT_ID" = ${raw_pmsaccounting_voidCredit}."CREDIT_ID"`,
        relationship: `hasMany`
    },
    
  },
 
  dimensions: {
    creditId: {
      sql: `${stg_pms_credit}."CREDIT_ID"`,
      type: `string`,
      primaryKey: true
    },   
   
    voidCreditId: {
      sql: `${raw_pmsaccounting_voidCredit.voidCreditId}`,
      type: `string`
    }   
  },
  
  dataSource: `snowflake_pms`
});

cube(`stg_pms_appayment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_apPayment.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pms_credit: {
        sql: `${stg_pms_appayment}."CREDIT_ID" = ${stg_pms_credit.creditId}`,
        relationship: `hasMany`
    },
    
  },
 
  dimensions: {
    creditId: {
      sql: `${stg_pms_credit.creditId}`,
      type: `string`
    },   

    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`,
      primaryKey: true
    },

    voidCreditId: {
      sql: `${stg_pms_credit.voidCreditId}`,
      type: `string`
    }   
  },
  
  dataSource: `snowflake_pms`
});

cube(`stg_pms_appayment_item`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_apPaymentItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pms_appayment: {
        sql: `${stg_pms_appayment_item}."AP_PAYMENT_ITEM_ID" = ${stg_pms_appayment}."AP_PAYMENT_ID"`,
        relationship: `hasMany`
    },
    
  },
 
  dimensions: {
    creditId: {
      sql: `${stg_pms_appayment.creditId}`,
      type: `string`
    },   

    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`
    },

    apPaymentItemId: {
      sql: `${CUBE}."AP_PAYMENT_ITEM_ID"`,
      type: `string`,
      primaryKey: true
    },

    invoiceItemId: {
      sql: `${CUBE}."INVOICE_ITEM_ID"`,
      type: `string`
    },

    voidCreditId: {
      sql: `${stg_pms_appayment.voidCreditId}`,
      type: `string`
    } 
    
  },
  
  dataSource: `snowflake_pms`
});

cube(`stg_pms_invoice_item`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_invoiceItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pms_appayment_item: {
        sql: `${stg_pms_invoice_item.invoiceId} = ${stg_pms_appayment_item.invoiceItemId}`,
        relationship: `hasMany`
    },
    
    stg_pmsaccounting_glAccount: {
      sql: `${stg_pms_invoice_item}."EXPENSE_GL_ACCOUNT_ID" = ${stg_pmsaccounting_glAccount.glAccountId}`,
      relationship: `hasMany`
  },
  },
 
  dimensions: {
    creditId: {
      sql: `${stg_pms_appayment_item.creditId}`,
      type: `string`
    },   

    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: `string`
    },

    apPaymentItemId: {
      sql: `${CUBE}."AP_PAYMENT_ITEM_ID"`,
      type: `string`
    },

    invoiceItemId: {
      sql: `${CUBE}."INVOICE_ITEM_ID"`,
      type: `string`,
      primaryKey: true
    },

    invoiceItemAmount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `number`
    },

    invoiceItemDescription: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },

    voidCreditId: {
      sql: `${stg_pms_appayment_item.voidCreditId}`,
      type: `string`
    },
    invoiceId: {
      sql: `${CUBE}."INVOICE_ID"`,
      type: `string`
    },
    glAccount: {
      sql: `${stg_pmsaccounting_glAccount.glName}`,
      type: `string`
    },
    glAccountCode: {
      sql: `${stg_pmsaccounting_glAccount.glNumber}`,
      type: `string`
    },
    rehabItem: {
      sql: `${stg_pmsaccounting_glAccount.isRehabItem}`,
      type: `boolean`
    }  
  },
  
  dataSource: `snowflake_pms`
});