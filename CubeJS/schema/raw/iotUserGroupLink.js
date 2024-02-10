cube(`raw_iot_User_Group_Link`, {
    sql: `select 
    id,
    apartment_community_id as iot_id
    ,parent_user_group_id,
    child_user_group_id,
    route,
    direct,
    company_id as apartment_community_id
    from user_group_link a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });