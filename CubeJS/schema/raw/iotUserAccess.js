cube(`raw_iot_User_Access`, {
    sql: `select
    id,
    time_from,
    time_to,
    user_access_type,
    user_access_status,
    negative_permission,
    user_group_id,
    schedule_id,
    apartment_community_id as iot_id
    ,description,
    company_id as apartment_community_id
    from user_access a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });