cube(`stg_pmsaccounting_vendorAttachment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorAttachment.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [vendorId, attachmentId, vendorAttachmentId]
    }
  },
  
  dimensions: {
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    attachmentId: {
      sql: `${CUBE}."ATTACHMENT_ID"`,
      type: `string`
    },
    
    vendorAttachmentId: {
      sql: `${CUBE}."VENDOR_ATTACHMENT_ID"`,
      type: `string`
    },
    
    category: {
      sql: `${CUBE}."CATEGORY"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
