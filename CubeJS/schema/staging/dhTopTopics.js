cube(`stg_another_provider_top5_topics_dropoff`, {
    sql: `WITH CTE_TOPICS AS (
                SELECT COMMUNITY_ID
                    ,TOPIC
                    ,ROW_NUMBER() OVER (PARTITION BY COMMUNITY_ID ORDER BY count(TOPIC) DESC) TOPIC_POSITION
                FROM ${raw_another_provider_CteConversationTurns.sql()}  
                WHERE LAST_ROW =1     
                GROUP BY COMMUNITY_ID, TOPIC)
                SELECT COMMUNITY_ID
                        ,LISTAGG(TOPIC,', ') TOPICS        
                FROM   CTE_TOPICS
                WHERE  TOPIC_POSITION < 6
                GROUP BY COMMUNITY_ID`,

   dimensions: {
  
    communityId: {
        sql: `${CUBE}."COMMUNITY_ID"`,
        type: `string`,
        primaryKey: true
        },
  
    topics: {
        sql: `${CUBE}."TOPICS"`,
        type: `string`
      },

    },
  
      dataSource: `snowflake_vendor_source`
});



cube(`stg_another_provider_top5_topics`, {
    sql: `WITH CTE_TOPICS AS (
                SELECT COMMUNITY_ID
                    ,TOPIC
                    ,ROW_NUMBER() OVER (PARTITION BY COMMUNITY_ID ORDER BY count(TOPIC) DESC) TOPIC_POSITION
                FROM ${raw_another_provider_CteConversationTurns.sql()}       
                GROUP BY COMMUNITY_ID, TOPIC)
                SELECT COMMUNITY_ID
                        ,LISTAGG(TOPIC,', ') TOPICS        
                FROM   CTE_TOPICS
                WHERE  TOPIC_POSITION < 6
                GROUP BY COMMUNITY_ID`,

   dimensions: {
  
    communityId: {
        sql: `${CUBE}."COMMUNITY_ID"`,
        type: `string`,
        primaryKey: true
        },
  
    topics: {
        sql: `${CUBE}."TOPICS"`,
        type: `string`
      },

    },
  
      dataSource: `snowflake_vendor_source`
});