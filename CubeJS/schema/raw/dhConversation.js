cube(`raw_another_provider_Conversations`, {
  sql: `SELECT  
  ID_CONVERSATION,
  TOUR_SCHEDULED,
  FEEDBACK_COMMENT,
  GUEST_MOOD,
  DH_NAME,
  PLATFORM,
  COMMUNICATION_METHOD,
  LATITUDE,
  LONGITUDE,
  CASE LANGUAGE WHEN 'es' THEN 'Spanish' WHEN 'en' THEN 'English' ELSE LANGUAGE END as LANGUAGE,
  USER_AGENT,
  GUEST_ID,
  COMMUNITY_ID,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  EMAIL,
  NOTES,
  TURN_TIMESTAMP_INI_ORIGINAL_TIME,
  TURN_TIMESTAMP_END_ORIGINAL_TIME,
  LAST_INTENT,
  CUSTOMER_ID,
  C_COMMUNITY_NAME,
  C_CITY,
  C_ADDRESS,
  C_STATE,
  C_POSTAL_CODE,
  C_EMAIL,
  C_PHONE_NUMBER,
  C_COMMUNITY_SHORT_NAME,
  COM_LATITUDE,
  COM_LONGITUDE,
  GEOGRAPHIC_LOCATION,
  SMS_PHONE_NUMBER,
  TIMEZONE_ID,
  COM_DISABLED_AT,
  CALCULATED_PLATFORM,
  TURN_TIMESTAMP_COMMUNITY_TIME,
  TURN_YEAR,
  TURN_MONTH,
  MONTH_NAME,
  DAY_OF_WEEK,
  HOUR_OF_DAY_UTC,
  "last_intent_detection_confidence",
  CONVERSATION_TIMESPAN_SECONDS,
  CONV_TURNS,
  VISITED_CONTACT_FORM,
  SUBMITTED_CONTACT_FORM,
  TOUR_SCHEDULED_FORM,
  CONVERSATION_LENGTH_CATEGORY,
  CONVERSATION_LENGTH_CATEGORY_ORDER,
  DAY_OF_WEEK_NAME,
  HOUR_OF_DAY_CATEGORY,
  HOUR_OF_DAY_CATEGORY_ORDER,
  LANGUAGE_FILTER,
  DH_NAME_FILTER
  FROM dhpublic_mt.mt_conversation`,

  dimensions: {

    idConversation: {
        sql: `${CUBE}."ID_CONVERSATION"`,
        type: `string`,
        primaryKey: true
        },

    propertyName: {
          sql: `${CUBE}."C_COMMUNITY_NAME"`,
          type: `string`,            
        },
    convTurns: {
      sql: `${CUBE}."CONV_TURNS"`,
      type: `string`,            
    }, 
    
    dhName: {
      sql: `${CUBE}."DH_NAME"`,
      type: `string`,            
    }, 
    
    language: {
      sql: `${CUBE}."LANGUAGE"`,
      type: `string`,            
    }, 

    conversationDate: {
      sql: `${CUBE}."TURN_TIMESTAMP_COMMUNITY_TIME"`,
      type: `time`,            
    },      

    submittedContactForm: {
      sql: `${CUBE}."SUBMITTED_CONTACT_FORM"`,
      type: `time`,            
    },      
              
    }, 
  dataSource: `snowflake_vendor_source`
});