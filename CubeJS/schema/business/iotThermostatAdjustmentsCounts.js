//IOTU01

cube(`bus_iot_thermostatAdjustmentsCounts`, {
    sql: `select * from ${raw_iot_reports_thermostatAdjustmentsAppVsDirectReport.sql()}`,

    measures: {
        totalAdjustments: {
            sql: `ADJUSTMENTS`,
            type: `sum`,
            meta: {
                shortTitle: "Adj.",
                styleType: "total"
            }
        },
        totalDirectAdjustments: {
            sql: `DIRECT_ADJUSTMENTS`,
            type: `sum`,
            shown: false,
            meta: {
                shortTitle: "Total Direct Adjustments",
                styleType: "subtotal",
                series: "Direct Control",
                color: "#3498DB"
            }
        },
        totalAppAdjustments: {
            sql: `APP_ADJUSTMENTS`,
            type: `sum`,
            meta: {
                shortTitle: "Total App Adjustments",
                color: "#D1E8F8",
                styleType: "subtotal",
                series: "App Control"
            }
        },
        pctApp: {
            sql: `SUM(APP_ADJUSTMENTS) / SUM(ADJUSTMENTS)`,
            type: `number`,
            meta: {
                shortTitle: "% App Control",
                styleType: "percentage",
                series: "App Control"
            }
        },
        pctDirect: {
            sql: `SUM(DIRECT_ADJUSTMENTS) / SUM(ADJUSTMENTS)`,
            type: `number`,
            shown: false,
            meta : {
                shortTitle: "% Direct Control",
                styleType: "percentage",
                series: "Direct Control"
            }
        }
    },

    dimensions: {
        communityId: {
            sql: `apartment_community_id`,
            type: `string`,
            primaryKey: true,
            shown: false
        },
        updatedAt: {
            sql: `updated_at`,
            type: `time`,
            shown: false
        }
    },

    dataSource: `snowflake_iot`
  });
