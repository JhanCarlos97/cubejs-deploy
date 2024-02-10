cube(`stg_pmsaccounting_notificationRecipient`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_notificationRecipient.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [notificationRecipientId, notificationId, recipientId]
    }
  },
  
  dimensions: {
    notificationRecipientId: {
      sql: `${CUBE}."NOTIFICATION_RECIPIENT_ID"`,
      type: `string`
    },
    
    notificationId: {
      sql: `${CUBE}."NOTIFICATION_ID"`,
      type: `string`
    },
    
    recipientId: {
      sql: `${CUBE}."RECIPIENT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
