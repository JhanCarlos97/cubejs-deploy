cube(`stg_iot_Device_Comm_Failures_Thermostat`, {
    sql: `
    SELECT *
    FROM ${raw_iot_Thermostat.sql()} a
    WHERE device_communication_status = 'OFFLINE'
      `,    
        
    measures: {
    },
    
    dimensions: {      
    },
    
    dataSource: `postgres_iot`
  });