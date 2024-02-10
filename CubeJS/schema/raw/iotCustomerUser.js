cube(`raw_iot_Customer_User`, {
    sql: `select	
    user_id,
    apartment_community_id as iot_id
    ,id,
    customer_id,
    deleted_at,
    company_id as apartment_community_id
    from customer_user a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });