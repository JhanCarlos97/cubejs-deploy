cube(`stg_iot_Automation_Vacant_Units_by_Thermostat_Control_Method`, {
    sql: `     
    Select
        unnest(array[1,2]) as Order,
        unnest(array['Automatic', 'Manual']) as Mode,
        /* USE THIS JUST IN TEST MODE */
        /*unnest(array[30,6]) as Value,*/  
        /* USE THIS JUST IN TEST MODE */
        unnest(array[coalesce (sum(case when al.location_id is not null then 1 end), 0) , coalesce(sum(case when al.location_id is null then 1 end), 0)]) as Value,
        l.apartment_community_id
    from ${raw_iot_location.sql()}  l
    inner join  ${raw_iot_Thermostat.sql()} t on
        t.location_id = l.id
    left join (
        select
            el.location_id,
            el.apartment_community_id
        from ${raw_iot_Smart_Policy_Event_Log.sql()} el
        inner join (
            select
                l.location_id,
                max(l.date) last_event_date,
                l.apartment_community_id
            from ${raw_iot_Smart_Policy_Event_Log.sql()} l
            inner join  ${raw_iot_Thermostat.sql()} t on
                t.location_id = l.location_id
            group by
                l.location_id,
                l.apartment_community_id
    ) mel
    on   el.location_id = mel.location_id
            and el.date = mel.last_event_date
            and el.apartment_community_id = mel.apartment_community_id
        inner join (
            select
                id,
                apartment_community_id
            from ${raw_iot_smart_policy.sql()} a
            where "type" = 'VACANT_UNITS'
            and active) pi
        on  el.policy_id = pi.id 
            and el.apartment_community_id = pi.apartment_community_id
        where el.type = 'APPLIED'				     
    ) al on al.location_id = l.id
    where l.location_type = 'UNIT'
        and location_flag = 'LEASABLE'
        and unit_status = 'VACANT'        
    group by
        l.apartment_community_id
      `,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });