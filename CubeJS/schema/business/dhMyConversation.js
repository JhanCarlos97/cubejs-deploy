// Here, the joins should be done using the Cube syntax instead of the SQL,
// but since we're going to use Snowflake tasks it isn't worth to write it all down
cube(`bus_another_provider_MyConversation1`, {
  sql: `
SELECT
  *
FROM ${raw_another_provider_IntentHasGlobalIntentResponse.sql()}`,

joins: {

  stg_another_provider_IntentResponse: {
      sql: `${bus_another_provider_MyConversation1.intentResponseId} = ${stg_another_provider_IntentResponse.idIntentResponse}`,
      relationship: `belongsTo`
    },

    stg_another_provider_Intent: {
      sql: `${bus_another_provider_MyConversation1.intentName} = ${stg_another_provider_Intent.intentName}`,
      relationship: `belongsTo`
    },

    stg_another_provider_CommunityIntent: {
      sql: `${bus_another_provider_MyConversation1.intentName} = ${stg_another_provider_CommunityIntent.intentName}`,
      relationship: `belongsTo`
    },

    stg_another_provider_CommunityIntentUsesGlobalIntentResponse: {
      sql: `${bus_another_provider_MyConversation1.intentResponseId} = ${stg_another_provider_CommunityIntentUsesGlobalIntentResponse.intentResponseId}`,
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
    title: `Intent name`,
    shown: true,
    meta: {
      show: true
    }    
  },
  
  intentResponseId: {
    sql: `intent_response_id`,
    type: `string`
  },

  nextLevelDetail: {
      sql: `
      CASE 
          WHEN ${stg_another_provider_IntentParent.suggestionText} = ${stg_another_provider_Intent.suggestionText}
          THEN 'General'
          ELSE ${stg_another_provider_Intent.suggestionText}
      END`,
      type: `string`,
      title: `Subtopic`,
      shown: true,
      meta: {
        styleType: 'text',
        sortable: true,
        size: 109,
        show: true
      }
    },

    active: {
      sql: `
      CASE 
          WHEN ${stg_another_provider_CommunityIntentUsesGlobalIntentResponse.intentResponseId} IS NULL
          THEN FALSE
          ELSE TRUE
      END`,
      type: `string`,
      title: `Active`,
      shown: true,
      meta: {
        styleType: 'check',
        sortable: true,
        size: 91,
        show: true
      }
    },

    lowerParentIntentSuggestionText: {
      sql: `LOWER(${stg_another_provider_IntentParent.suggestionText})`,
      type: `string`,
      title: `Intent`
    },

},

segments: {
  mainSegment: {
      sql: `
      ${stg_another_provider_IntentResponse.idIntentResponse} IS NOT NULL
      AND ${stg_another_provider_Intent.intentName} IS NOT NULL
      AND ${stg_another_provider_IntentParent.suggestionText} IS NOT NULL 
      AND ${stg_another_provider_Intent.disabledAt} IS NULL`
  },

},

    dataSource: `snowflake_vendor_source`
});


cube(`bus_another_provider_MyConversation2`, {
sql: `
SELECT
*
FROM ${raw_another_provider_CommunityIntent.sql()}`,

joins: {

stg_another_provider_CommunityIntentUsesCommunityIntentResponse: {
  sql: `${bus_another_provider_MyConversation2.idCommunityIntent} = ${stg_another_provider_CommunityIntentUsesCommunityIntentResponse.communityIntentId}`,
  relationship: `belongsTo`
  },

  stg_another_provider_Community: {
    sql: `${bus_another_provider_MyConversation2.communityId} = ${stg_another_provider_Community.idCommunity}`,
    relationship: `belongsTo`
  },

},

dimensions: {

customerId: {
  sql: `customer_id`,
  type: `string`
},

intentName: {
  sql: `intent_name`,
  type: `string`
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
},

nextLevelDetail: {
    sql: `
    CASE 
        WHEN ${stg_another_provider_IntentParent.suggestionText} = ${stg_another_provider_Intent.suggestionText}
        THEN 'General'
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

  active: {
    sql: `
    CASE 
        WHEN ${stg_another_provider_IntentResponse.indicatesFeatureNotPresent} = 0
        THEN FALSE
        ELSE TRUE
    END`,
    type: `string`,
    title: `Active`,
    meta: {
      styleType: 'check',
      sortable: true,
      size: 91,
      show: true
    }
  },

  lowerParentIntentSuggestionText: {
    sql: `LOWER(${stg_another_provider_IntentParent.suggestionText})`,
    type: `string`
  },

},

segments: {
mainSegment: {
    sql: `
    ${stg_another_provider_CommunityIntentUsesCommunityIntentResponse.communityIntentId} IS NOT NULL
    AND ${stg_another_provider_IntentResponse.idIntentResponse} IS NOT NULL
    AND ${stg_another_provider_Intent.intentName} IS NOT NULL
    AND ${stg_another_provider_Community.idCommunity} IS NOT NULL
    AND ${stg_another_provider_IntentParent.suggestionText} IS NOT NULL 
    AND ${stg_another_provider_Intent.disabledAt} IS NULL`
},

},

  dataSource: `snowflake_vendor_source`
});