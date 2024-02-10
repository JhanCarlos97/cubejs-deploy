cube(`raw_iot_lock_database_transaction`, {
  sql: `
  SELECT * FROM lock_database_transaction
  `,

  dimensions: {

    commandName: {
      sql: `command_name`,
      type: `string`
    },

  },
  
  dataSource: `postgres_iot`
});