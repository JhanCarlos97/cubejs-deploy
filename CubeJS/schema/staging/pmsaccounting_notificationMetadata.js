cube(`stg_pmsaccounting_notificationMetadata`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_notificationMetadata.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [notificationMetadataId, notificationId]
    }
  },
  
  dimensions: {
    notificationMetadataId: {
      sql: `${CUBE}."NOTIFICATION_METADATA_ID"`,
      type: `string`
    },
    
    notificationId: {
      sql: `${CUBE}."NOTIFICATION_ID"`,
      type: `string`
    },
    
    key: {
      sql: `${CUBE}."KEY"`,
      type: `string`
    },
    
    value: {
      sql: `${CUBE}."VALUE"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
