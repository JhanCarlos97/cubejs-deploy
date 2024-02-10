cube(`raw_iot_User_Access_To_LocationSNF`, {
    sql: `
    SELECT 
      a.* RENAME(apartment_community_id as iot_id), 
      b.company_id as apartment_community_id
    FROM IOT_INTERMEDIATE.user_access_to_location a
    LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
    ON a.apartment_community_id = b.iot_id
    `,
    
    dataSource: `snowflake_iot`
  });

  cube(`raw_iot_User_Access_To_Location`, {
    sql: `SELECT * FROM user_access_to_location`,
    
    dataSource: `postgres_iot`
  });