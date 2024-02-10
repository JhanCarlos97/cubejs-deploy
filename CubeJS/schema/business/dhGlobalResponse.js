cube(`bus_another_provider_GlobalIntentResponse`, {
    sql: `
    SELECT 
        *
    FROM ${stg_another_provider_GlobalIntentResponse.sql()}
    UNION
    SELECT 
        *
    FROM ${stg_another_provider_IntentResponseGR.sql()}
    `,
    sqlAlias: `GlobalResponse`,
    
      dimensions: {

        intentResponseId: {
          sql: `intent_response_id`,
          type: `string`,
          meta: {
            show: false
          }
        },
    
        intentNameNoSuggest: {
          sql: `intent_name_no_suggest`,
          type: `string`,
          meta: {
            show: false
          }
        },
    
        mainTopic: {
          sql: `main_topic`,
          type: `string`,
          title: `Main topic`,
          meta: {
            styleType: 'textLeft',
            sortable: true,
            size: 154,
            show: true
          }
        },
        
        conversationDetail: {
          sql: `conversation_detail`,
          type: `string`,
          title: `Topic`,
          meta: {
            styleType: 'textLeft',
            sortable: true,
            size: 106,
            show: true
          }
        },
    
        nextLevelDetail: {
          sql: `next_level_detail`,
          type: `string`,
          title: `Subtopic`,
          meta: {
            styleType: 'textLeft',
            sortable: true,
            size: 109,
            show: true
          }
        },
    
        response: {
          sql: `response`,
          type: `string`,
          title: `Response`,
          meta: {
            styleType: 'textLeft',
            size: 553,
            show: true
          }
        },
    
        communitiesUsingThisResponse: {
          sql: `communities_using_this_response`,
          type: `number`,
          title: `Qty`,
          meta: {
            styleType: 'textRight',
            sortable: true,
            size: 71,
            show: true
          }
        },

        defaultResponse: {
          sql: `default_response`,
          type: `boolean`,
          title: `Default`,
          meta: {
            styleType: 'check',
            sortable: true,
            size: 99,
            show: true
          }
        },
    
      },
    
    dataSource: `snowflake_vendor_source`
  });