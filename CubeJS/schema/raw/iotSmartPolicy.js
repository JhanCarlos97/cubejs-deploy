cube(`raw_iot_smart_policy`, {
    sql: `select 
    id,
    type,
    name,
    active,
    apartment_community_id as iot_id
    ,condition_id,
    company_id as apartment_community_id
    from smart_policy a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });