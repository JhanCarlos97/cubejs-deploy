cube(`bus_iot_loraStatistics`, {
  sql: `
    select * from  
    ${raw_iot_reports_loraStatisticsReport.sql()}
    where lora_command_name is not null
  `,

  measures: {

    total: {
      type: `sum`,
      sql: `${bus_iot_loraStatistics}.total`,
      meta: {
        styleType: "total"
      }
    },

    success: {
      type: `sum`,
      sql: `${bus_iot_loraStatistics}.success`,
      meta: {
        styleType: "subtotal",
        color: "#D1E8F8",
        series: "App Control"
      }
    },

    successRate: {
      type: `number`,
      sql: `ROUND(100.0 * DIV0(${success},${total}), 2)`,
      meta: {
        styleType: "percentage",
        series: "App Control"
      }
    },

  },

  dimensions: {

    dt: {
      sql: `${bus_iot_loraStatistics}.dt`,
      type: `time`
    },

    communityId: {
      sql: `${bus_iot_loraStatistics}.apartment_community_id`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

  },

  dataSource: `snowflake_iot`
});