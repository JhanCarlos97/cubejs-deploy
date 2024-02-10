cube(`raw_iot_pacs_transaction_lock_database_transaction`, {
    sql: `SELECT * FROM pacs_transaction_lock_database_transaction`,
    
    joins: {
      raw_iot_pacs_transaction: {
        sql: `${raw_iot_pacs_transaction_lock_database_transaction}.pacs_transaction_id = ${raw_iot_pacs_transaction}.id`,
        relationship: `hasOne`
    },
    },

    dataSource: `postgres_iot`
  });