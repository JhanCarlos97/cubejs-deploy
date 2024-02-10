cube(`stg_pmsaccounting_invoiceMetadata`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_invoiceMetadata.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [invoiceItemId, metadataId, tageName]
    }
  },
  
  dimensions: {
    invoiceItemId: {
      sql: `${CUBE}."INVOICE_ITEM_ID"`,
      type: `string`
    },
    
    tagValue: {
      sql: `${CUBE}."TAG_VALUE"`,
      type: `string`
    },
    
    metadataId: {
      sql: `${CUBE}."METADATA_ID"`,
      type: `string`
    },
    
    tageName: {
      sql: `${CUBE}."TAGE_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
