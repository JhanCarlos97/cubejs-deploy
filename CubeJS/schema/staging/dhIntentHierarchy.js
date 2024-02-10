cube(`stg_another_provider_IntentHierarchy`, {
    sql: `SELECT * FROM ${raw_another_provider_IntentHierarchy.sql()}`,
    
   
    joins: {
  
      stg_another_provider_IntentParent: {
        sql: `${stg_another_provider_IntentHierarchy.intentNameParent} = ${stg_another_provider_IntentParent.intentName}`,
        relationship: `belongsTo`
      },
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [intentNameChild, intentNameParent, intentCategoryName]
      }
    },
    
    dimensions: {
      intentNameChild: {
        sql: `intent_name_child`,
        type: `string`,
        primaryKey: true
      },
      
      intentNameParent: {
        sql: `intent_name_parent`,
        type: `string`
      },
      
      intentCategoryName: {
        sql: `intent_category_name`,
        type: `string`
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  