cube(`stg_another_provider_AllData`, {
    sql: `
    SELECT 
      ct.community_id as community_id_filter,
      *
    FROM ${stg_another_provider_CteConversationTurns.sql()} AS ct
    INNER JOIN ${raw_another_provider_GuestConversations.sql()} AS gc ON ct.conversations_id = gc.conversation_id`,
  });