cube(`stg_iot_Hardware_Errors_T_System_Voltage_Low`, {
    sql: `
    SELECT *         
    FROM  ${raw_iot_Thermostat.sql()} a
    WHERE system_voltage_state = 'LOW'
    `,

    measures: {
    },

    dimensions: {
    },
    
    dataSource: `postgres_iot`
  });