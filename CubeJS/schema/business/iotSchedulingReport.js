cube(`bus_iot_schedulingReport`, {
    sql: `select * from ${raw_iot_reports_unitUsingSchedulingReport.sql()}`,
    measures: {
        units: {
            sql: `LOCATION_ID`,
            type: `countDistinct`,
            title: "Units",
            meta: {
                styleType: "total",
            }
        },
        scheduling: {
            sql: `case when USING_SCHEDULE then LOCATION_ID end`,
            type: `countDistinct`,
            title: "Scheduling",
            meta: {
                styleType: "subtotal"
            }
        },
        pctUsingSchedule: {
            sql: `round(100.0 * DIV0(${scheduling}, ${units}), 2)`,
            type: `number`,
            title: "% Using Schedule",
            meta: {
                styleType: "percentage"
            }
        }
    },
    dimensions: {
        communityId: {
            sql: `apartment_community_id`,
            type: `string`,
            shown: true
        },
        updatedAt: {
            sql: `updated_at`,
            type: `time`,
            shown: false
        }
    },

    dataSource: `snowflake_iot`
  });
