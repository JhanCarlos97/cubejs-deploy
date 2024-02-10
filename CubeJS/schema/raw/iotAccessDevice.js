cube(`raw_iot_Access_Device`, {
    sql: `
    SELECT
        *
    FROM access_device a
    LEFT JOIN ${raw_iot_Apartment_Community.sql()} b on a.id = b.iot_id`,
    
    dataSource: `postgres_iot`
  });