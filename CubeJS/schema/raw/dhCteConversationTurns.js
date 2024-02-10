cube(`raw_another_provider_CteConversationTurns`, {
    sql: `
    SELECT 
        FIRST_ROW,
        LAST_ROW,
        TURN_TIME,
        INPUT_TYPE,
        INTENT_NAME,
        TOPIC,
        SUBTOPIC,
        ITEM,
        VISITED_CONTACT_FORM,
        SUBMITTED_CONTACT_FORM,
        TOUR_SCHEDULED_FORM,
        USER_REQUEST,
        IS_FACE_PRESENT,
        WEBHOOK_LATENCY,
        CONVERSATIONS_ID,
        DIALOGFLOW_CONTEXT,
        INTENT_RESPONSE_ID,
        ID_CONVERSATION_TURN,
        HISTORIC_RESPONSE_TEXT,
        INTENT_DETECTION_CONFIDENCE,
        COMMUNITY_ID,
        TURN_TIMESTAMP_COMMUNITY_TIME,
        TURN_YEAR,
        TURN_MONTH,
        DAY_OF_WEEK,
        HOUR_OF_DAY_UTC,
        CASE language
          WHEN 'es' THEN 'Spanish'
          WHEN 'en' THEN 'English'
          ELSE language
          END as LANGUAGE,
        DH_NAME
    FROM dhpublic_mt.mt_conversationturns
    `,
    
    dataSource: `snowflake_vendor_source`
  });