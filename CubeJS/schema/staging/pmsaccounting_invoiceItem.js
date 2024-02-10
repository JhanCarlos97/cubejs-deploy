cube(`stg_pmsaccounting_invoiceItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_invoiceItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [invoiceId, businessUnitId, unitId, updatedBy, expenseGlAccountId, billItemId, createdBy, invoiceItemId, createdDate, updatedDate, deletedDate]
    }
  },
  
  dimensions: {
    invoiceId: {
      sql: `${CUBE}."INVOICE_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    unitId: {
      sql: `${CUBE}."UNIT_ID"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    expenseGlAccountId: {
      sql: `${CUBE}."EXPENSE_GL_ACCOUNT_ID"`,
      type: `string`
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    billItemId: {
      sql: `${CUBE}."BILL_ITEM_ID"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    invoiceItemId: {
      sql: `${CUBE}."INVOICE_ITEM_ID"`,
      type: `string`
    },
    
    cashMap: {
      sql: `${CUBE}."CASH_MAP"`,
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
    
    deletedDate: {
      sql: `${CUBE}."DELETED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
