cube(`bus_another_provider_Transcript`, {
  sql: `
  SELECT 
      *
  FROM ${stg_another_provider_AllData.sql()}`,
  sqlAlias: `Transcript`,

  joins: {

    stg_another_provider_TurnsData_Transcript: {
      sql: `${stg_another_provider_TurnsData_Transcript.conversationsId} = ${bus_another_provider_Transcript.conversationsId}`,
      relationship: `belongsTo`
    },

  },

  
  
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
        isGroupIdentifier: true
      }
    },

    turnTime: {
      sql: `turn_time`,
      type: `time`,
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

    userRequest: {
      sql: `user_request`,
      type: `string`,
      title: 'Prospect',
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

    isFacePresent: {
      sql: `is_face_present`,
      type: `boolean`,
      title: `Camera is turned on`,
      meta: {
        styleType: 'icon',
        show: false
      }
    },

    intentDetectionConfidence: {
      sql: `cast(intent_detection_confidence as decimal(18,2))`,
      type: `string`,
      title: `Detection confidence`,
      meta: {
        styleType: 'text',
        show: false
      }
    },
    
    person: {
      sql: `person`,
      type: `string`,
      title: `Person`
    },

    dialogue: {
      sql: `dialogue`,
      type: `string`,
      title: `Dialogue`
    },

    extra: {
      sql: `extra`,
      type: `string`,
      title: `Extra`
    },

    communityId: {
      sql: `community_id_filter`,
      type: `string`
    },
  },

  segments: {
    innerJoinSegment: {
        sql: `${stg_another_provider_TurnsData_Transcript.conversationsId} IS NOT NULL`
    }
  },
  
  dataSource: `snowflake_vendor_source`
});
