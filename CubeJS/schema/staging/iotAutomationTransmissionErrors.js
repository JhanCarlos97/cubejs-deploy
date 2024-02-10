cube(`stg_iot_Automation_Transmission_Errors_Event`, {
    sql: `
    select l.location_id, max(l.date) last_event_date
    from ${raw_iot_Smart_Policy_Event_Log.sql()}  l
   inner join ${raw_iot_Thermostat.sql()} t on t.location_id = l.location_id
    group by l.location_id
    `,    
        
    measures: {
    },
    
    dimensions: {      
    },
    
    dataSource: `postgres_iot`
  });

  cube(`stg_iot_Automation_Transmission_Errors`, {
    sql: `
    select count(el.location_id) as qty, 
    case unit_status when 'VACANT' then 'Vacant Units'
                      when 'OCCUPIED' then 'Move-Ins' end as unit_status, el.apartment_community_id
    from ${raw_iot_Smart_Policy_Event_Log.sql()} el
    inner join ${stg_iot_Automation_Transmission_Errors_Event.sql()} mel on el.location_id = mel.location_id and el.date = mel.last_event_date
    inner join ${raw_iot_location.sql()} l on l.id = el.location_id
    where el.type = 'TRANSMISSION_ERROR' and l.location_type = 'UNIT' and location_flag = 'LEASABLE'
    and el.policy_id in (select id from ${raw_iot_smart_policy.sql()} a where active)
    group by case unit_status when 'VACANT' then 'Vacant Units' when 'OCCUPIED' then 'Move-Ins' end, el.apartment_community_id

    `,    
        
    measures: {
    },
    
    dimensions: {      
    },
    
    dataSource: `postgres_iot`
  });