cube(`stg_another_provider_CommunityIntentUsesCommunityIntentResponse`, {
    sql: `SELECT * FROM ${raw_another_provider_CommunityIntentUsesCommunityIntentResponse.sql()}`,
    
  joins: {
  
      stg_another_provider_IntentResponse: {
        sql: `${stg_another_provider_CommunityIntentUsesCommunityIntentResponse.intentResponseId} = ${stg_another_provider_IntentResponse.idIntentResponse}`,
        relationship: `belongsTo`
      },
  
      stg_another_provider_Intent: {
        sql: `${stg_another_provider_CommunityIntentUsesCommunityIntentResponse.intentName} = ${stg_another_provider_Intent.intentName}`,
        relationship: `belongsTo`
      },
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [intentName, communityId, intentResponseId, communityIntentId]
      }
    },
    
    dimensions: {
      intentName: {
        sql: `intent_name`,
        type: `string`
      },
      
      communityId: {
        sql: `community_id`,
        type: `string`,
        primaryKey: true
      },
      
      intentResponseId: {
        sql: `intent_response_id`,
        type: `string`
      },
      
      communityIntentId: {
        sql: `community_intent_id`,
        type: `string`
      },
  
      disabled: {
        sql: `disabled`,
        type: `number`
      },
  
      active: {
        sql: `
        CASE
          WHEN ${disabled} = 0 THEN 1 
          ELSE 0
        END
          `,
        type: `number`
      },
    },
    
    dataSource: `snowflake_vendor_source`
  });
  