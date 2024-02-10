cube(`stg_another_provider_IntentResponse`, {
    sql: `SELECT * FROM ${raw_another_provider_IntentResponse.sql()}`,
    
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [idIntentResponse, responseTextUpdatedAt, spanishResponseTextUpdatedAt]
      }
    },
    
    dimensions: {
      responseText: {
        sql: `response_text`,
        type: `string`,
        title: `Response`,
        shown: true,
        meta: {
          styleType: 'text',
          size: 318.5,
          show: true
        }
      },
      
      idIntentResponse: {
        sql: `id_intent_response`,
        type: `string`,
        primaryKey: true
      },
      
      spanishResponseText: {
        sql: `spanish_response_text`,
        type: `string`,
        title: `Translate`,
        shown: true,
        meta: {
          styleType: 'text',
          size: 318.5,
          show: true
        }
      },
      
      responseTextUpdatedAt: {
        sql: `response_text_updated_at`,
        type: `time`
      },
      
      spanishResponseTextUpdatedAt: {
        sql: `spanish_response_text_updated_at`,
        type: `time`
      },
  
      indicatesFeatureNotPresent: {
        sql: `indicates_feature_not_present`,
        type: `number`
      },
    },
    
    dataSource: `snowflake_vendor_source`
  });
  