cube(`raw_iot_User_Database_Transaction`, {
    sql: `SELECT * FROM user_database_transaction`,
    
    dataSource: `postgres_iot`
  });