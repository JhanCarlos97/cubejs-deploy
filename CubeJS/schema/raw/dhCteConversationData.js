cube(`raw_another_provider_CteConversationData`, {
    sql: `
    SELECT 
    * 
    FROM dhpublic_mt.mt_conversation_data
    `,
    
    dataSource: `snowflake_vendor_source`
  });