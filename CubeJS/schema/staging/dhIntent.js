cube(`stg_another_provider_Intent`, {
    sql: `SELECT * FROM ${raw_another_provider_Intent.sql()}`,
    
     
    joins: {
  
      stg_another_provider_IntentHierarchy: {
        sql: `${stg_another_provider_Intent.intentName} = ${stg_another_provider_IntentHierarchy.intentNameChild}`,
        relationship: `belongsTo`
      },

      stg_another_provider_CommunityIntent: {
        sql: `${stg_another_provider_Intent.intentName} = ${stg_another_provider_CommunityIntent.intentName}`,
        relationship: `belongsTo`
      },
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [intentName, defaultResponseId, intentCategoryName, createdAt, updatedAt]
      }
    },
    
    dimensions: {
      intentName: {
        sql: `intent_name`,
        type: `string`,
        primaryKey: true,
        shown: true
      },
  
      suggestionText: {
        sql: `suggestion_text`,
        type: `string`,
        title: `Suggestion text`
      },
      
      intentDescription: {
        sql: `intent_description`,
        type: `string`
      },
      
      defaultResponseId: {
        sql: `default_response_id`,
        type: `string`
      },
      
      intentCategoryName: {
        sql: `intent_category_name`,
        type: `string`,
        title: `Main topic`,
        shown: true,
        meta: {
          styleType: 'text',
          sortable: true,
          fixed: true,
          size: 138,
          show: true,
          filterPosition: "key,label"
        }
      },
      
      suggestionSpanishText: {
        sql: `suggestion_spanish_text`,
        type: `string`
      },
      
      createdAt: {
        sql: `created_at`,
        type: `time`
      },
      
      updatedAt: {
        sql: `updated_at`,
        type: `time`
      },
      
      disabledAt: {
        sql: `disabled_at`,
        type: `time`
      },
  
      nextLevelDetail: {
        sql: `
        CASE
          WHEN ${stg_another_provider_IntentParent.suggestionText} = ${stg_another_provider_Intent.suggestionText} THEN 'General'
          ELSE ${stg_another_provider_Intent.suggestionText}
        END`,
        type: `string`,
        title: `Subtopic`,
        meta: {
          styleType: 'text',
          sortable: true,
          size: 109,
          show: true
        }
      },
  
    },
    
    dataSource: `snowflake_vendor_source`
  });
  