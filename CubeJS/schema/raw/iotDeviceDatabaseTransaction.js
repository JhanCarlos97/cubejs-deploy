cube(`raw_iot_device_database_transaction`, {
    sql: `select 
    id,
    start_date,
    end_date,
    status_changed,
    apartment_community_id as iot_id
    ,status,
    attempt,
    company_id as apartment_community_id
    from device_database_transaction a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });