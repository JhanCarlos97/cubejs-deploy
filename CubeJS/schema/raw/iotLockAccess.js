cube(`raw_iot_lockAccess`, {
    sql: `
    SELECT * FROM lock_access
    `,
    
    dataSource: `postgres_iot`
  });