cube(`raw_iot_leaseResident`, {
    sql: `select * from lease_resident`,
    
    dataSource: `postgres_iot`
  });