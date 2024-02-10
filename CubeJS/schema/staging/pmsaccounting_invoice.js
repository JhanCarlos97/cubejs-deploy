cube(`stg_pmsaccounting_invoice`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_invoice.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [createdBy, bindId, customerId, businessUnitId, invoiceId, updatedBy, createdDate, updatedDate, dueDate, invoiceDate, postDate, deletedDate]
    }
  },
  
  dimensions: {
    invoiceNumber: {
      sql: `${CUBE}."INVOICE_NUMBER"`,
      type: `string`
    },
    
    invoiceAmount: {
      sql: `${CUBE}."INVOICE_AMOUNT"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    bindId: {
      sql: `${CUBE}."BIND_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    invoiceNotes: {
      sql: `${CUBE}."INVOICE_NOTES"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    invoiceId: {
      sql: `${CUBE}."INVOICE_ID"`,
      type: `string`,
      primaryKey: true,
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },

    payeeId: {
      sql: `${CUBE}."PAYEE_ID"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
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
    
    dueDate: {
      sql: `${CUBE}."DUE_DATE"`,
      type: `time`
    },
    
    invoiceDate: {
      sql: `${CUBE}."INVOICE_DATE"`,
      type: `time`
    },
    
    postDate: {
      sql: `${CUBE}."POSTED_AT"`,
      type: `time`
    },
    
    deletedDate: {
      sql: `${CUBE}."DELETED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
