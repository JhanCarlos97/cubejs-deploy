cube(`stg_another_provider_CommunityIntent`, {
    sql: `SELECT * FROM ${raw_another_provider_CommunityIntent.sql()}`,
    
    
    joins: {
  
      stg_another_provider_Community: {
        sql: `${stg_another_provider_CommunityIntent.communityId} = ${stg_another_provider_Community.idCommunity}`,
        relationship: `belongsTo`
      },
  
      stg_another_provider_Customer: {
        sql: `${stg_another_provider_CommunityIntent.customerId} = ${stg_another_provider_Customer.idCustomer}`,
        relationship: `belongsTo`
      },
      
      stg_another_provider_CommunityIntentUsesGlobalIntentResponse: {
        sql: `${stg_another_provider_CommunityIntent.customerId} = ${stg_another_provider_CommunityIntentUsesGlobalIntentResponse.idCustomer}
        and ${stg_another_provider_CommunityIntent.idCommunityIntent} = ${stg_another_provider_CommunityIntentUsesGlobalIntentResponse.communityIntentId}`,
        relationship: `belongsTo`
      },
  
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [customerId, intentName, communityId, idCommunityIntent]
      }
    },
    
    dimensions: {
      customerId: {
        sql: `customer_id`,
        type: `string`
      },

      customerName: {
        sql: `${stg_another_provider_Customer.cCustomerName}`,
        type: `string`,
      },
      
      intentName: {
        sql: `intent_name`,
        type: `string`,
        title: `Intent name`,
        meta: {
          show: false
        }
      },
      
      communityId: {
        sql: `community_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },
      
      idCommunityIntent: {
        sql: `id_community_intent`,
        type: `string`
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  