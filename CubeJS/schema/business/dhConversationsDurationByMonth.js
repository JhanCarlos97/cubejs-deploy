cube(`bus_another_provider_ConversationsDurationByMonth`, {
    sql: `
    SELECT *
    FROM ${stg_another_provider_ConversationsDurationByMonth.sql()}
    `,
  
    measures: {
      totalConversation: {
        type: `sum`,
        sql: `coalesce(total_conversation, 0)`
        },
  
      totalConversationDuration: {
        type: `sum`,
        sql: `coalesce(total_conversation_duration, 0)`
        },
  
      averageConversationDuration: {
        type: `number`,
        sql: ` round(coalesce(${totalConversationDuration}/CASE WHEN ${totalConversation} = 0 THEN 1 ELSE ${totalConversation} END,0),2)`
        },
  
      totalPartition: {
        type: `number`,
        sql: `sum(${totalConversation}) over(partition by ${dhName})`
        },
  
      totalConversationMeasure: {
        type: `number`,
        sql: `sum(${totalConversation})`
        },
    }, 
  
   dimensions: {
  
      communityId: {
        sql: `community_id`,
        type: `string`,
        primaryKey: true,
        shown: true
        },
  
      turnDay: {
        sql: `turn_day`,
        type: `time`
      },
  
      turnYear: {
        sql: `turn_year`,
        type: `number`
      },
    
      turnMonth: {
        sql: `turn_month`,
        type: `number`
      },
  
      monthName: {
        sql: `month_name`,
        type: `string`
      },
  
      dhName: {
        sql: `dh_name`,
        type: `boolean`
      },
  
      dhNamePlaceholder: {
        sql: `1`,
        type: `boolean`
      },
  
      languagePlaceholder: {
        sql: `1`,
        type: `boolean`
      },
  
      convTurnsPlaceholder: {
        sql: `999`,
        type: `number`
      },
  
      tourScheduledFormPlaceholder: {
        sql: `'true'`,
        type: `boolean`
      },
  
      submittedContactFormPlaceholder: {
        sql: `'true'`,
        type: `boolean`
      },
  
      },
   
  
      dataSource: `snowflake_vendor_source`
    });
  