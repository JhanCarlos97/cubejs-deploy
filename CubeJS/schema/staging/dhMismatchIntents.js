cube(`stg_another_provider_Fallback_MismatchIntents`, {
    sql: `
    SELECT 
      distinct conversations_id
    FROM ${raw_another_provider_CteConversationTurns.sql()}
    WHERE
      intent_name = 'Fallback'`,
  });
  
  cube(`stg_another_provider_Grouped_MismatchIntents`, {
    sql: `
    SELECT
      ad.*
    FROM ${stg_another_provider_AllData.sql()} AS ad
    INNER JOIN ${stg_another_provider_Fallback_MismatchIntents.sql()} AS f ON ad.conversations_id = f.conversations_id
    `,
  });