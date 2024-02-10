cube(`bus_another_provider_ConversationsByPlatformUnion`, {
    sql: `
    SELECT 
        min(a.community_id) AS community_id_filter,
        min(a.dt) AS turn_day_filter,
        sum(case when tour_scheduled_form = true then 1 else 0 end) AS tour_scheduled_form_sum,
        sum(case when submitted_contact_form = true then 1 else 0 end) AS submitted_contact_form_sum,
        count(b.id_conversation) AS total,
        CASE 
            WHEN category not like '%Unknown%' THEN row_number() over(partition by (category not like '%Unknown%') order by coalesce(count(id_conversation),0) desc) 
            ELSE 6
        END AS category_order,
        a.category
    FROM ${stg_another_provider_CteCalendarPlataform.sql()} AS a
    LEFT JOIN ${stg_another_provider_CteConversation.sql()} AS b
        ON a.community_id = b.community_id
        AND a.dt = b.turn_timestamp_community_time::date
        AND a.category = b.calculated_platform
        AND b.conv_turns > 1
        AND dh_name is not null
        AND language is not null
    WHERE
    ${FILTER_PARAMS.bus_another_provider_ConversationsByPlatformUnion.communityId.filter('a.community_id')}
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsByPlatformUnion.turnDay.filter((from, to) => `a.dt >= ${from} AND a.dt <= ${to}`)}
    GROUP BY a.category
    `,
    
    measures: {

        totalConversation: {
            type: `sum`,
            sql: `total`
        },

        totalConversationPercentage: {
            type: `number`,
            sql: `coalesce(round((10000*coalesce(sum(total),0)/nullif(sum(sum(total)) over(),0))/100::float,2),0)`
        },

        totalTourScheduled: {
            type: `sum`,
            sql: `tour_scheduled_form_sum`
        },
    
        totalFormSubmissions: {
            type: `sum`,
            sql: `submitted_contact_form_sum`
        },
    
        conversionRateTour: {
            type: `number`,
            sql: `coalesce(round(100*sum(tour_scheduled_form_sum)::float/nullif(sum(total),0), 2),0)`
        },
    
        conversionRateForm: {
            type: `number`,
            sql: `coalesce(round(100*sum(submitted_contact_form_sum)::float/nullif(sum(total),0), 2),0)`
        },

    },

   dimensions: {
  
    communityId: {
        sql: `community_id_filter`,
        type: `string`,
        primaryKey: true,
        shown: true
        },
  
    turnDay: {
        sql: `turn_day_filter`,
        type: `time`
      },

    category: {
        sql: `CASE WHEN category_order::decimal <= 5 THEN category ELSE 'Others' END`,
        type: `string`
      },

    order: {
        sql: `category_order`,
        type: `number`
      }
    },
  
      dataSource: `snowflake_vendor_source`
    });
  