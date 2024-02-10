cube(`bus_another_provider_MismatchIntents`, {
  sql: `
  SELECT 
      *
  FROM ${stg_another_provider_Grouped_MismatchIntents.sql()}`,
  sqlAlias: `MismatchIntents`,
  
  dimensions: {

    conversationsId: {
      sql: `conversations_id`,
      type: `string`,
      title: `Dialogflow session`,
      primaryKey: true,
      shown: true,
      meta: {
        styleType: 'text',
        clickable: true,
        show: false,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true,
        isGroupIdentifier: true,
      }
    },

    turnTime: {
      sql: `turn_time`,
      type: `time`,
      title: `Turn time`,
      meta: {
        show: false
      }
    },

    turnTimeDate: {
      sql: `turn_time::date`,
      type: `time`,
      title: `Date`,
      meta: {
        styleType: 'text',
        show: false,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: false
      }
    },

    hourMinute: {
      sql: `substring(${turnTime}, 12, 5)`,
      type: `string`,
      title: ` `,
      meta: {
        styleType: 'text',
        size: 72,
        show: true
      }
    },
    
    person: {
      sql: `person`,
      type: `string`,
      title: `Person`,
    },

    dialogue: {
      sql: `dialogue`,
      type: `string`,
      title: `Dialogue`,
    },

    intentName: {
      sql: `intent_name`,
      type: `string`,
      title: `Intent name`,
      meta: {
        show: false
      }
    },

    flag: {
      sql: `
      CASE
        WHEN intent_name = 'Fallback' THEN TRUE
        ELSE FALSE
      END
      `,
      type: `string`
      ,
      title: `Flag`,
      meta: {
        show: false
      }
    },

    userRequest: {
      sql: `user_request`,
      type: `string`,
      title: `Prospect`,
      meta: {
        styleType: 'text',
        size: 509,
        show: true
      }
    },

    historicResponseText: {
      sql: `historic_response_text`,
      type: `string`,
      title: `vendor source`,
      meta: {
        styleType: 'text',
        size: 509,
        show: true
      }
    },

    communityId: {
      sql: `community_id_filter`,
      type: `string`,
      meta: {
        show: false
      }
    },
  },
  
  dataSource: `snowflake_vendor_source`
});
