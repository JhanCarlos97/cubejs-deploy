cube(`stg_pmsaccounting_invoiceAttachment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_invoiceAttachment.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [invoiceId, attachmentId]
    }
  },
  
  dimensions: {
    invoiceId: {
      sql: `${CUBE}."INVOICE_ID"`,
      type: `string`
    },
    
    attachmentId: {
      sql: `${CUBE}."ATTACHMENT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
