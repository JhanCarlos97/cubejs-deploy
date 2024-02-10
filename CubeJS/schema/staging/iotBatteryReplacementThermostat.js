cube(`stg_iot_Battery_Replacement_T`, {
    sql: `
    SELECT 1 as qty, 
    coalesce(main_battery_state, 'NORM') as main_battery_state,
    case coalesce(main_battery_state, 'NORM') when 'LOW' then 'Low'
                            when 'NORM' then 'Normal'
                            when 'CRITICAL' then 'Critical' 
                            end as state,
    *         
    FROM  ${raw_iot_Thermostat.sql()} a`,

    measures: {
    },

    dimensions: {
    },
    
    dataSource: `postgres_iot`
  });