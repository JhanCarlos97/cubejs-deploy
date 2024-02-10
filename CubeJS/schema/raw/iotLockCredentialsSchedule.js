cube(`raw_iot_lockCredentialsSchedule`, {
    sql: `
    SELECT
    a.id,
    a.created_at,
    a.updated_at,
    a.days_of_week,
    a.time_from,
    a.time_to,
    a.name,
    a.default_schedule,
    a.deleted_at, 
    b.company_id as apartment_community_id
    FROM lock_credentials_schedule a
      left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,

    
    dataSource: `postgres_iot`,
  });