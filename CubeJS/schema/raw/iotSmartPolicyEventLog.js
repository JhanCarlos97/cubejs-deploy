cube(`raw_iot_Smart_Policy_Event_Log`, {
    sql: `select
    id,
    policy_id,
    location_id,
    date,
    apartment_community_id as iot_id
    ,type,
    conditions,
    smart_policy_trigger_source,
    company_id as apartment_community_id
    from smart_policy_event_log a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });