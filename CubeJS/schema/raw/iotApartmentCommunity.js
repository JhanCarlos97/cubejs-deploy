cube(`raw_iot_Apartment_Community`, {
    sql: `SELECT 
    id as iot_id,
    local_time_zone,
    qpms_community_id as company_id
    FROM apartment_community a`,

    dimensions: {
      localTimeZone: {
        sql: `${CUBE}.local_time_zone`,
        type: `string`
    },
    },
    
    dataSource: `postgres_iot`
  });