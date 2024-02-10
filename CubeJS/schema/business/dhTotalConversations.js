cube(`bus_another_provider_Conversations`, {
  sql: `
  SELECT 
      *
  FROM ${stg_another_provider_CteConversation.sql()}`,     
  
  
  joins: {

    stg_another_provider_top5_topics: {
      sql: `${CUBE}."COMMUNITY_ID" = ${stg_another_provider_top5_topics.communityId}`,
      relationship: `belongsTo`
      },

      stg_another_provider_top5_topics_dropoff: {
        sql: `${CUBE}."COMMUNITY_ID" = ${stg_another_provider_top5_topics_dropoff.communityId}`,
        relationship: `belongsTo`
      },  
    
    }, 
  
  measures: {
      count: {
        type: `count`,
        sql: `*`,         
        title: `Total conversations`,    
        meta: {
          show: true,
          size: 250,
          sortable: true
        }    
        },

      totalTurns: {
          sql: `${CUBE}."CONV_TURNS"`,
          type: `sum`
          },    

      sumSubmittedContactForm: {
        type: `sum`,
        sql: `CASE WHEN ${submittedContactForm} = TRUE THEN 1 ELSE 0 END`,         
        title: `Total forms submitted`,    
        meta: {
          show: true,
          size: 275,
          sortable: true
          }              
        },        

      conversionRateSubmittedContactForm: {
        type: `number`,
        sql: `coalesce(round(100 * ${sumSubmittedContactForm}::float / nullif(${count},0),2),0)`,          
        title: `Form conversion rate`,    
        meta: {
          show: true,
          size: 276,
          sortable: true
          }              
        }, 

      sumTourScheduledForm: {
        type: `sum`,
        sql: `CASE WHEN ${tourScheduledForm} = TRUE THEN 1 ELSE 0 END`,          
        title: `Total tours scheduled`,    
        meta: {
          show: true,
          size: 135,
          sortable: true
        }    
        },

      conversionTourScheduledForm: {
        type: `number`,
        sql: `coalesce(round(100 * ${sumTourScheduledForm}::float / nullif(${count},0),2),0)`,          
        title: `Tour conversion rate`,    
        meta: {
          show: true,
          size: 276,
          sortable: true
        }    
        },

      avgConversationDuration: {
        type: `avg`,
        sql: `coalesce(${conversationTimespanSeconds},0)`,
        }, 	

      avgNumTurns: {
        type: `number`,
        sql: `coalesce(round(${CUBE.totalTurns}::float / nullif(${count},0),2),0)`,         
        title: `Average number of turns`,    
        meta: {
          show: true,
          size: 276,
          sortable: true
        }    
        },             

  },
  
  dimensions: {

      communityId: {
        sql: `community_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },

      idConversation: {
          sql: `id_conversation`,
          type: `string`,
          primaryKey: true,
          shown: true
      },
  
      turnTimestampCommunityTime: {
        sql: `turn_timestamp_community_time`,
        type: `time`
      },

      
      conversationTimespanSeconds: {
        sql: `conversation_timespan_seconds`,
        type: `number`
      }, 

      conversationLengthCategory: {
        sql: `	
        conversation_length_category`,
        type: `string`
      },
  
      conversationLengthCategoryOrder: {
        sql: `	
        conversation_length_category_order`,
        type: `string`
      },

      dayWeekName: {
        sql: `	
        day_of_week_name`,
        type: `string`
      },
      
      hourOfDayCategory: {
        sql: `	
        hour_of_day_category`,
        type: `string`
      },
      
      hourOfDayCategoryOrder: {
        sql: `	
        hour_of_day_category_order`,
        type: `string`
      },
      
     convTurns: {
          sql: `	
          conv_turns`,
          type: `string`
      },

      turnYear: {
          sql: `	
          turn_year`,
          type: `string`
      },

      turnMonth: {
          sql: `	
          turn_month`,
          type: `string`
      },

      turnDay: {
          sql: `
          turn_timestamp_community_time::date`,
          type: `time`,            
      },

      monthName: {
        sql: `	
        month_name`,
        type: `string`
    },

      dhName: {
          sql: `	
          dh_name`,
          type: `string`
      },

      language: {
          sql: `	
          language`,
          type: `string`
      },

      tourScheduledForm: {
        sql: `	
        tour_scheduled_form`,
        type: `string`
      },

      submittedContactForm: {
        sql: `	
        submitted_contact_form`,
        type: `string`
      },	
      
      
      topics: {
        sql: `${stg_another_provider_top5_topics.topics}`,
        type: `string`,   
        title: `Top 5 topics`,         
        meta: {
          styleType: 'string',
          show: true,
          size: 276,
          sortable: true
        },
      },                 

    topicsDropOff: {
        sql: `${stg_another_provider_top5_topics_dropoff.topics}`,
        type: `string`,   
        title: `Top 5 topics before drop-off`,         
        meta: {
          styleType: 'string',
          show: true,
          size: 276,
          sortable: true
        },
      },   

    propertyName: {
        sql: `${CUBE}."C_COMMUNITY_NAME"`,
        type: `string`,   
        title: `Property name`,         
        meta: {
          styleType: 'string',
          show: true,
          size: 160,
          sortable: true
        },
      },    

    },

    segments: {
      dhm01Segment: {
          sql: `${convTurns} > 1 AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL`
      },

      dhm02Segment: {
          sql: `${convTurns} > 1 AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL AND ${tourScheduledForm} = TRUE`
      },

      dhm03Segment: {
        sql: `${convTurns} > 1 AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL AND ${submittedContactForm} = TRUE`
      },

      dhm07Segment: {
          sql: `${convTurns} > 1 AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL`
      },
    },
    
    dataSource: `snowflake_vendor_source`
  });
