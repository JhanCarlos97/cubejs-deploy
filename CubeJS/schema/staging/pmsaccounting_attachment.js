cube(`stg_pmsaccounting_attachment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_attachment.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [updatedBy, createdBy, attachmentId, name, trackingId, createdDate, updatedDate, deletedDate]
    }
  },
  
  dimensions: {
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    path: {
      sql: `${CUBE}."PATH"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    type: {
      sql: `${CUBE}."TYPE"`,
      type: `string`
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    attachmentId: {
      sql: `${CUBE}."ATTACHMENT_ID"`,
      type: `string`
    },
    
    name: {
      sql: `${CUBE}."NAME"`,
      type: `string`
    },
    
    trackingId: {
      sql: `${CUBE}."TRACKING_ID"`,
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
