cube(`stg_iot_Device_Comm_Failures_Lock`, {
    sql: `
    SELECT *
    FROM ${raw_iot_Lock.sql()} a
    WHERE device_communication_status = 'OFFLINE'
    AND status = 'INSTALLED'
      `,    
        
    measures: {
    },
    
    dimensions: {      
    },
    
    dataSource: `postgres_iot`
  });