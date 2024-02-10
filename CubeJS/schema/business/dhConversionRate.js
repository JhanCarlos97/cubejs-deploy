cube(`bus_another_provider_ConversationsRate`, {
    sql: `
  Select
    a.community_id as community_id_filter,
    a.month_name as month_nm,
    *
  from ${raw_another_provider_CteCommunityCalendar.sql()} a
  left join ${stg_another_provider_CteConversation.sql()} b           
    on a.community_id = b.community_id 
    and a.dt = b.turn_timestamp_community_time::date     
    and b.conv_turns > 1
    and dh_name is not null
    and language is not null
  `,

    measures: {
      quantity: {
        type: `number`,
        sql: ` sum(case when tour_scheduled_form = true then 1 else 0 end)`
        }, 
      quantityForm: {
          type: `number`,
          sql: ` sum(case when submitted_contact_form = true then 1 else 0 end)`
          },    
      totalConversation: {
        type: `number`,
        sql: ` coalesce(count(id_conversation),0)`
        },      
      conversionRatePercentage: {
        type: `number`,
        sql: `round((10000 * ${quantity}/CASE when ${totalConversation}=0 then 1 else ${totalConversation} end)/100::float,2)`
        },
      totalForms: {
          type: `number`,
          sql: `round((10000 * ${quantityForm}/CASE when ${totalConversation}=0 then 1 else ${totalConversation} end)/100::float,2)`
          }  
    }, 
   dimensions: {

      communityId: {
        sql: `community_id_filter`,
        type: `string`,
        primaryKey: true,
        shown: true
        },

      dt: {
        sql: `dt`,
        type: `time`
        },
    
      turnYear: {
          sql: `year`,
          type: `number`
        },

      turnMonth: {
            sql: `month`,
            type: `number`
        },    

      dhName: {
        sql: `dh_name`,
        type: `string`
      },

      language: {
        sql: `language`,
        type: `string`
      },

      monthName: {
        sql: `month_nm`,
        type: `string`
      },

      },

      dataSource: `snowflake_vendor_source`
    });

