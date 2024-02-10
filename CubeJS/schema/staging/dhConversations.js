cube(`stg_another_provider_CteIntents`, {
  sql: `
  SELECT 
    *
  FROM ${raw_another_provider_Intents.sql()}
  `
});

cube(`stg_another_provider_CteConversationTurns`, {
  sql: `
  SELECT 
    * 
  FROM ${raw_another_provider_CteConversationTurns.sql()}  
  `
});

cube(`stg_another_provider_CteConversationTurnsAgg`, {
  sql: `
  SELECT 
    * 
  FROM ${raw_another_provider_CteConversationTurnsAgg.sql()}
  `
});

cube(`stg_another_provider_CteConversationData`, {
  sql: `
  SELECT 
    * 
  FROM ${raw_another_provider_CteConversationData.sql()}
  `
});

cube(`stg_another_provider_CteConversation`, {
  sql: `
  SELECT 
    * 
  FROM ${raw_another_provider_Conversations.sql()} 
  `
});

cube(`stg_another_provider_CteCategories`, {
  sql: `
    Select distinct
      community_id,
      hour_of_day_category_order as hour_of_day_category_order,
      hour_of_day_category as hour_of_day_category,
      dh_name,
      language,
      calculated_platform
    from ${stg_another_provider_CteConversation.sql()} 	 A        
  `,
});

cube(`stg_another_provider_CteCalendarCategories`, {
  sql: `
    select
        *
    from ${raw_another_provider_CteCalendar.sql()}
    cross join (select distinct community_id,
                       hour_of_day_category category,
                       hour_of_day_category_order "order"
                       from ${stg_another_provider_CteCategories.sql()})
  `,
}); 

cube(`stg_another_provider_CteCalendarLanguages`, {
  sql: `
  select
  *
  from ${raw_another_provider_CteCalendar.sql()}
  cross join (
    SELECT distinct community_id, language category from ${stg_another_provider_CteCategories.sql()}
    where community_id is not null
    )
  `,
});  

cube(`stg_another_provider_CteCalendarDHName`, {
  sql: `
  select
  *
  from ${raw_another_provider_CteCalendar.sql()}
  cross join (
    SELECT distinct community_id, dh_name category from ${stg_another_provider_CteCategories.sql()}
    where community_id is not null
    )
  `,
});  

cube(`stg_another_provider_CteCalendarPlataform`, {
  sql: `
  select
  *
  from ${raw_another_provider_CteCalendar.sql()}
  cross join (
    SELECT distinct community_id, calculated_platform category from ${stg_another_provider_CteCategories.sql()}
    where community_id is not null
    )
  `,
});

cube(`stg_another_provider_CteCalendarMonth`, {
  sql: `
  select
  *
  from ${raw_another_provider_CteCalendar.sql()}
  cross join (
    SELECT distinct community_id, hour_of_day_category category, hour_of_day_category_order as "order" from ${stg_another_provider_CteCategories.sql()}
    where community_id is not null
    )
  `,
});


cube(`stg_another_provider_ConversationsByTimeOfDay`, {
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
  `,
});

cube(`stg_another_provider_ConversationsDurationByMonthAgent`, {
  sql: `
  select
	a.community_id,
	a.year as turn_year,
	a.month as turn_month,
  a.month_name,
	a.dt as turn_day,
	a.category as dh_name,
	sum(conversation_timespan_seconds) as total_conversation_duration,
	count(b.id_conversation) as total_conversation
	from ${stg_another_provider_CteCalendarDHName.sql()} a
	left join ${stg_another_provider_CteConversation.sql()} b
		on a.community_id  = b.community_id
		and a.dt = b.turn_timestamp_community_time::date
		and a.category = b.dh_name
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.convTurnsPlaceholder.filter('b.conv_turns')}
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.dhNamePlaceholder.filter('b.dh_name_filter')}
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.languagePlaceholder.filter('b.language_filter')}
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.tourScheduledFormPlaceholder.filter('b.tour_scheduled_form')}
    AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.submittedContactFormPlaceholder.filter('b.submitted_contact_form')}
  WHERE a.category is not null
  AND ${FILTER_PARAMS.bus_another_provider_ConversationsDurationByMonth.turnDay.filter((from, to) => `a.dt >= ${from} AND a.dt <= ${to}`)}
	group by a.community_id,a.year,a.month,a.dt,a.category, a.month_name
  QUALIFY sum(count(b.id_conversation)) over(partition by a.category) != 0
  `,
});

cube(`stg_another_provider_ConversationsDurationByMonth`, {
  sql: `
  select 
    *
  from ${stg_another_provider_ConversationsDurationByMonthAgent.sql()}
	union
	select
    community_id,
    turn_year,
    turn_month,
    month_name,
    turn_day,
    'Total' as dh_name,
    sum(total_conversation_duration) as total_conversation_duration,
    sum(total_conversation) as total_conversation
    from ${stg_another_provider_ConversationsDurationByMonthAgent.sql()}
    GROUP BY community_id, turn_year, turn_month, turn_day, month_name, dh_name
  `,
});

cube(`stg_another_provider_ConversationTurnsPopularTopics`,{
  sql: `
  select
  row_number() over ( order by count(*) desc) as rn,
  count(*) quantity,
  upper(substring(topic,1,1))||(lower(substring(topic,2))) as topic,
  min(turn_timestamp_community_time::date) as turn_day,
  min(community_id) as community_id
  from ${stg_another_provider_CteConversationTurns.sql()}
  where intent_name not in ('Welcome','Fallback')
  and not (first_row = 1 and last_row = 1)
  and dh_name is not null and language is not null
  and ${FILTER_PARAMS.bus_another_provider_MostPopularTopics.communityId.filter('community_id')}
  and ${FILTER_PARAMS.bus_another_provider_MostPopularTopics.turnDay.filter((from, to) => `turn_timestamp_community_time::date >= ${from} AND turn_timestamp_community_time::date <= ${to}`)}
  group by topic
  order by 1 asc
  `,
});

