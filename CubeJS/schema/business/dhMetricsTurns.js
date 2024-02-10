cube(`bus_another_provider_MetricsTurns`, {
    sql: `
    SELECT 
        *
    FROM ${stg_another_provider_CteConversationTurns.sql()}`,    

    measures: {
        count: {
          type: `count`,
          drillMembers: [idConversation]
          },

        percentage: {
          type: `number`,
          sql: `coalesce(round((10000*${count}/nullif(sum(${count}) over(),0))/100::float,2),0)`
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
            sql: `conversations_id`,
            type: `string`,
            primaryKey: true,
            shown: true
        },
    
        turnTimestampCommunityTime: {
          sql: `turn_timestamp_community_time`,
          type: `time`
        },

        turnDay: {
            sql: `
            turn_timestamp_community_time::date`,
            type: `time`
        },
        
        intentName: {
          sql: `intent_name`,
          type: `string`
        }, 

        topic: {
            sql: `upper(substring(topic,1,1))||(lower(substring(topic,2)))`,
            type: `string`
          }, 

        inputType: {
          sql: `input_type`,
          type: `string`
        }, 

        firstRow: {
          sql: `first_row`,
          type: `number`
        }, 

        lastRow: {
          sql: `last_row`,
          type: `number`
        }, 
        
        dhName: {
            sql: `	
            dh_name`,
            type: `string`
        },

        language: {
            sql: `language`,
            type: `string`
        },

      },

      segments: {
        dhm16Segment: {
            sql: `${firstRow} > 1 and ${inputType} is not null and ${inputType} not in ('Auto') AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL and not (${firstRow} = 1 and ${lastRow} = 1)`
        },
        dhm25Segment: {
          sql: `${intentName} NOT IN ('Welcome','Fallback') AND ${language} IS NOT NULL AND ${dhName} IS NOT NULL and not (${firstRow} = 1 and ${lastRow} = 1)`
        },
  },
      
      dataSource: `snowflake_vendor_source`
    });

cube(`bus_another_provider_MostPopularTopics`, {
  sql: `
  SELECT *
  FROM ${stg_another_provider_ConversationTurnsPopularTopics.sql()}
  `,

  measures: {
    percentage: {
      sql: `coalesce(round(100*quantity::float/nullif(sum(quantity) over (),0),2),0)`,
      type: `number`
    }
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

  rn: {
      sql: `rn`,
      type: `number`
    },
  quantity: {
      sql: `quantity`,
      type: `number`
    },

  topic: {
      sql: `topic`,
      type: `string`
    }
  },

    dataSource: `snowflake_vendor_source`
  });
