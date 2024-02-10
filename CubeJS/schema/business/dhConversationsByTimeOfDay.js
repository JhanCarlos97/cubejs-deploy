cube(`bus_another_provider_ConversationsByTimeOfDay`, {
    sql: `
  Select
    a.community_id as community_id_filter,
    *
  from ${stg_another_provider_CteCalendarMonth.sql()} a
  left join ${stg_another_provider_CteConversation.sql()} b           
    on a.community_id = b.community_id 
    and a.dt = b.turn_timestamp_community_time::date 
    and a.category = b.hour_of_day_category 
    and b.conv_turns > 1
    and dh_name is not null
    and language is not null
  WHERE "order" IS NOT NULL`,

    measures: {
      quantity: {
        type: `number`,
        sql: `count(id_conversation)`
        },
      totalPercentageQuantity: {
        type: `number`,
        sql: `coalesce(round((10000 * ${quantity}/nullif(sum(${quantity}) over(),0))/100::float,2),0)`
        },
      totalTour: {
        type: `number`,
        sql: ` sum(case when tour_scheduled_form = true then 1 else 0 end)`
        },
      totalForm: {
        type: `number`,
        sql: ` sum(case when submitted_contact_form = true then 1 else 0 end)`
        },
      conversionRateTour: {
        type: `number`,
        sql: `coalesce(round((10000 * ${totalTour}/ nullif(${quantity},0))/100::float,2),0)`
        },
      conversionRateForm: {
        type: `number`,
        sql: `coalesce(round((10000 * ${totalForm}/ nullif(${quantity},0))/100::float,2),0)`
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
    
      order: {
        sql: `"order"`,
        type: `string`
      },

      category: {
        sql: `category`,
        type: `string`
      },

      dhName: {
        sql: `dh_name`,
        type: `string`
      },

      language: {
        sql: `language`,
        type: `string`
      },

      },

      dataSource: `snowflake_vendor_source`
    });

cube(`bus_another_provider_TourScheduledByTimeOfDay`, {
    sql: `
  Select
    a.community_id as community_id_filter,
    *
  from ${stg_another_provider_CteCalendarMonth.sql()} a
  left join ${stg_another_provider_CteConversation.sql()} b           
    on a.community_id = b.community_id 
    and a.dt = b.turn_timestamp_community_time::date 
    and a.category = b.hour_of_day_category
    and tour_scheduled_form = true
    and b.conv_turns > 1
    and dh_name is not null
    and language is not null
  WHERE "order" IS NOT NULL`,

    measures: {
      quantity: {
        type: `number`,
        sql: ` count(id_conversation)`
        },
      totalPercentageQuantity: {
        type: `number`,
        sql: `coalesce(round((10000 * ${quantity}/ nullif(sum(${quantity}) over(),0))/100::float,2),0)`
        },
      
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
    
      order: {
        sql: `"order"`,
        type: `string`
      },

      category: {
        sql: `category`,
        type: `string`
      },

      dhName: {
        sql: `dh_name`,
        type: `string`
      },

      language: {
        sql: `language`,
        type: `string`
      },

      },

      dataSource: `snowflake_vendor_source`
    });

cube(`bus_another_provider_FormSummissionsByTimeOfDay`, {
    sql: `
  Select
    a.community_id as community_id_filter,
    *
  from ${stg_another_provider_CteCalendarMonth.sql()} a
  left join ${stg_another_provider_CteConversation.sql()} b           
    on a.community_id = b.community_id 
    and a.dt = b.turn_timestamp_community_time::date 
    and a.category = b.hour_of_day_category
    and submitted_contact_form = true
    and b.conv_turns > 1
    and dh_name is not null
    and language is not null
  WHERE "order" IS NOT NULL`,
  
    measures: {
      quantity: {
        type: `number`,
        sql: `count(id_conversation)`
        },
      totalPercentageQuantity: {
        type: `number`,
        sql: `coalesce(round((10000 * ${quantity}/ nullif(sum(${quantity}) over(),0))/100::float,2),0)`
        },
      
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
    
      order: {
        sql: `"order"`,
        type: `string`
      },
  
      category: {
        sql: `category`,
        type: `string`
      },
  
      dhName: {
        sql: `dh_name`,
        type: `string`
      },
  
      language: {
        sql: `language`,
        type: `string`
      },
  
      },
  
      dataSource: `snowflake_vendor_source`
    });