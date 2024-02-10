cube(`stg_iot_Automation_Vacant_Units`, {
    sql: `
    SELECT CASE WHEN t.supervisory_control_override = false THEN 'Manual' ELSE 'Automatic' END as mode,
    t.apartment_community_id
    FROM
      ${raw_iot_Thermostat.sql()} t
    INNER JOIN
      ${raw_iot_location.sql()} l
    ON      t.location_id = l.id
    WHERE    
    /* COMMENT THIS JUST IN TEST MODE */
    t.temporary_mode_expired_at >= CURRENT_TIMESTAMP AND    
    /* COMMENT THIS JUST IN TEST MODE */
    l.location_type              = 'UNIT'
    AND     location_flag                = 'LEASABLE'
    AND     unit_status                  = 'VACANT'
   
      `,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });