cube(`stg_iot_Battery_Replacement_L`, {
    sql: `
    SELECT 1 as qty, 
    case main_battery_state when 'LOW' then 'Low'
                            when 'NORM' then 'Normal'
                            when 'CRITICAL' then 'Critical' 
                            end as state,
    *         
    FROM  ${raw_iot_Lock.sql()} a
    WHERE main_battery_state IN ('LOW' , 'NORM', 'CRITICAL')
    AND   status = 'INSTALLED'`,

    measures: {
    },

    dimensions: {
    },
    
    dataSource: `postgres_iot`
  });