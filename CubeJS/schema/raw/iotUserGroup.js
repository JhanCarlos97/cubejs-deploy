cube(`raw_iot_User_Group`, {
    sql: `select 
    id,
    user_group_name,
    user_group_type,
    apartment_community_id as iot_id,
    enabled,
    user_access_duration_days,
    schedule_id,
    company_id as apartment_community_id
    from user_group a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });