cube(`bus_iot_Hardware_Errors`, {
    sql: `
    Select   
    0 as value, 
    unnest(ARRAY['Lock RTC Time Lost Alert', 'Thermostat System Voltage Low', 'Thermostat System Error']) as hardware,
    company_id as apartment_community_id
    From ${raw_iot_Apartment_Community.sql()} d
    union all
    select 1 as value, 'Lock RTC Time Lost Alert' as hardware, apartment_community_id from ${stg_iot_Hardware_Errors_RTC_Time_Loss_Alert.sql()} a
    union all
    select 1 as value, 'Thermostat System Voltage Low' as hardware, apartment_community_id from ${stg_iot_Hardware_Errors_T_System_Voltage_Low.sql()} b
    union all
    select 1 as value, 'Thermostat System Error' as hardware, apartment_community_id from ${stg_iot_Hardware_Errors_T_System_Error_Count.sql()} c
  `,

    measures: {
      quantity: {
        type: `number`,
        sql: `sum(value)`
        },    
    }, 
   dimensions: {

      communityId: {
        sql: `apartment_community_id`,
        type: `string`,        
        shown: true
        }, 
        hardware: {
          sql: `hardware`,
          type: `string`,        
          shown: true
          }, 
        order:
        {
            sql: `case ${hardware} when 'Lock RTC Time Lost Alert' then 1
            when 'Thermostat System Voltage Low' then 2
            when 'Thermostat System Error' then 3
            end`,
            type: `number`,        
            shown: true,
            primaryKey: true
        },

        color: {
          sql: `case when ${quantity} > 0 then 'ED441B' else '0CA549' end`,
          type: `string`,        
          shown: true,
          subQuery: true,
        propagateFiltersToSubQuery: true
          },  
      },

      dataSource: `postgres_iot`
    });

