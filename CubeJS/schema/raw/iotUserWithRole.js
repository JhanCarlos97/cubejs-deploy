cube(`raw_iot_User_With_Role`, {
    sql: `select 
    user_id,
    apartment_community_id as iot_id
    ,customer_id,
    email,
    role_type,
    full_name,
    deleted_at,
    company_id as apartment_community_id
    from user_with_role a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });