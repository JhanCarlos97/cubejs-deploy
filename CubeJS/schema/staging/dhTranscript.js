cube(`stg_another_provider_TurnsData_Transcript`, {
  sql: `
  SELECT 
    conversations_id,
    count(*) AS total,
    EXTRACT(EPOCH FROM max(turn_time)::timestamp) -  EXTRACT(EPOCH FROM min(turn_time)::timestamp) AS duration
  FROM ${stg_another_provider_AllData.sql()}
  GROUP BY
    conversations_id`,

    dimensions: {

      conversationsId: {
        sql: `conversations_id`,
        type: `string`,
        primaryKey: true,
        shown: true,
        meta: {
          show: false
        }
      },
  
      total: {
        sql: `total`,
        type: `number`,
        title: 'Turns',
        meta: {
          styleType: 'text',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },
  
      duration: {
        sql: `duration`,
        type: `string`,
        meta: {
          styleType: 'text',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },
    },

    dataSource: `snowflake_vendor_source`
});
