cube(`raw_another_provider_CteConversationTurnsAgg`, {
    sql: `
    SELECT 
    * 
    FROM dhpublic_mt.mt_conversationturns_aggr
    `,
    
    dataSource: `snowflake_vendor_source`
  });