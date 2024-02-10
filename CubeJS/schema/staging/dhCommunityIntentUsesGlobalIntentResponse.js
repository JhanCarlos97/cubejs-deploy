cube(`stg_another_provider_CommunityIntentUsesGlobalIntentResponse`, {
    sql: `SELECT * FROM ${raw_another_provider_CommunityIntentUsesGlobalIntentResponse.sql()}`,
    
    
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [intentName, intentResponseId, communityIntentId]
      }
    },
    
    dimensions: {
      intentName: {
        sql: `intent_name`,
        type: `string`,
        primaryKey: true,
        shown: true
      },
      
      intentResponseId: {
        sql: `intent_response_id`,
        type: `string`
      },
      
      communityIntentId: {
        sql: `community_intent_id`,
        type: `string`
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  