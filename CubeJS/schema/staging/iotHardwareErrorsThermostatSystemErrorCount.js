cube(`stg_iot_Hardware_Errors_T_System_Error_Count`, {
    sql: `
    SELECT *         
    FROM  ${raw_iot_Thermostat.sql()} a
    WHERE system_error_status > 0  
    `,

    measures: {
    },

    dimensions: {
    },
    
    dataSource: `postgres_iot`
  });