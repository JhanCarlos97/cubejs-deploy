cube(`stg_another_provider_IntentParent`, {
    sql: `SELECT * FROM ${raw_another_provider_Intent.sql()}`,

    joins: {
      stg_another_provider_CommunityIntent: {
        sql: `${stg_another_provider_IntentParent.intentName} = ${stg_another_provider_CommunityIntent.intentName}`,
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
        title: `Topic`,
        shown: true,
        meta: {
          styleType: 'text',
          sortable: true,
          size: 117,
          show: true
        }
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
        type: `string`
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
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  