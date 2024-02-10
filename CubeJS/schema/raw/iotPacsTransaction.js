cube(`raw_iot_pacs_transaction`, {
  sql: `
  SELECT 
    *
  FROM pacs_transaction AS pt
  `,

  dimensions: {

    commandName: {
      sql: `command_name`,
      type: `string`
    },

  },
  
  dataSource: `postgres_iot`
});