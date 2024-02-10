cube(`stg_another_provider_IntentHasGlobalResponse`, {
    sql: `SELECT * FROM ${raw_another_provider_IntentHasGlobalIntentResponse.sql()}`,
    
   
    joins: {
  
      stg_another_provider_IntentResponse: {
        sql: `${stg_another_provider_IntentHasGlobalIntentResponse.intentResponseId} = ${stg_another_provider_IntentResponse.idIntentResponse}`,
        relationship: `belongsTo`
      },
  
      stg_another_provider_Intent: {
        sql: `${stg_another_provider_IntentHasGlobalIntentResponse.intentName} = ${stg_another_provider_Intent.intentName}`,
        relationship: `belongsTo`
      },
  
      stg_another_provider_CommunityIntent: {
        sql: `${stg_another_provider_IntentHasGlobalIntentResponse.intentName} = ${stg_another_provider_CommunityIntent.intentName}`,
        relationship: `belongsTo`
      },
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [intentName, intentResponseId]
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
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  