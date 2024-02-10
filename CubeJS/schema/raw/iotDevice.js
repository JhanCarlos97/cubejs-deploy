cube(`raw_iot_device`, {
    sql: `SELECT * FROM device`,
    
    dataSource: `postgres_iot`
  });