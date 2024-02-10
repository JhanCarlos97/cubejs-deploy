cube(`stg_iot_Hardware_Errors_RTC_Time_Loss_Alert`, {
    sql: `
    SELECT * FROM ${raw_iot_Lock.sql()} a
    WHERE rtc_time_lost_alert IS TRUE
      `,    
        
    measures: {
    },
    
    dimensions: {      
    },
    
    dataSource: `postgres_iot`
  });