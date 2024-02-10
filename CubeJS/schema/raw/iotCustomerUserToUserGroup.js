cube(`raw_iot_Customer_User_To_User_Group`, {
    sql: `SELECT * FROM customer_user_to_user_group`,
    
    dataSource: `postgres_iot`
  });