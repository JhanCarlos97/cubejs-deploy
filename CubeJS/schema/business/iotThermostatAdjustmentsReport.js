cube(`bus_iot_thermostatAdjustmentsReport`, {
	sql: `
    select * from ${raw_iot_intermediate_thermostatMetrics.sql()}
    `,

    measures: {
        adjustments: {
            sql: `SUM(CHANGE_MODE+CHANGE_SETPOINT)`,
            type: `number`,
            title: 'Thermostat Adjustments',
            meta: {
                title: "Thermostat Adjustments",
                styleType: "total",
                color: "#00A1E9"
            }
        },
        appAdjustments: {
            sql: `SUM(CASE WHEN USING_SCHEDULE = TRUE THEN CHANGE_MODE+CHANGE_SETPOINT ELSE 0 END)`,
            type: `number`,
            title: 'App Adjustments',
            meta: {
                color: "#D1E8F8",
                styleType: "subtotal",
                series: "App Control"
            }
        },
        directAdjustments: {
            sql: `SUM(CASE WHEN USING_SCHEDULE = FALSE THEN CHANGE_MODE+CHANGE_SETPOINT ELSE 0 END)`,
            type: `number`,
            title: 'Direct Adjustments',
            meta: {
                styleType: "subtotal",
                series: "Direct Control",
                color: "#3498DB"
            }
        },
        pctAppAdjustments: {
            sql: `DIV0(${appAdjustments}, ${adjustments})`,
            type: `number`,
            format: `percent`,
            title: '% App Adjustments',
            meta: {
                styleType: "percentage",
                series: "App Control"
            }
        },
        pctDirectAdjustments: {
            sql: `DIV0(${directAdjustments}, ${adjustments})`,
            type: `number`,
            format: `percent`,
            title: '% Direct Adjustments',
            meta: {
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
			shown: true
		},
		updatedAt: {
			sql: `updated_at`,
			type: `time`
		},
		timeOfDay2: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 0 AND 1 THEN   '12 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 2 AND 3 THEN   '02 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 4 AND 5 THEN   '04 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 6 AND 7 THEN   '06 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 8 AND 9 THEN   '08 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 10 AND 11 THEN '10 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 12 AND 13 THEN '12 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 14 AND 15 THEN '02 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 16 AND 17 THEN '04 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 18 AND 19 THEN '06 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 20 AND 21 THEN '08 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 22 AND 23 THEN '10 pm'
            END`,
			type: `string`,
            meta: {
                shortTitle: "Time of Day",
                styleType: "label",
                styleParse: "STRING"
            }
		},
		timeOfDay2Sorting: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 0 AND 1 THEN   0
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 2 AND 3 THEN   1
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 4 AND 5 THEN   2
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 6 AND 7 THEN   3
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 8 AND 9 THEN   4
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 10 AND 11 THEN 5
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 12 AND 13 THEN 6
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 14 AND 15 THEN 7
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 16 AND 17 THEN 8
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 18 AND 19 THEN 9
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 20 AND 21 THEN 10
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 22 AND 23 THEN 11
            END`,
			type: `string`
		},
		timeOfDay4: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 0 AND 3 THEN   '12 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 4 AND 7 THEN   '04 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 8 AND 11 THEN  '08 am'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 12 AND 15 THEN '12 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 16 AND 19 THEN '04 pm'
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 20 AND 23 THEN '08 pm'
            END`,
			type: `string`,
            meta: {
                shortTitle: "Time of Day",
                styleType: "label",
                styleParse: "STRING"
            }
		},
		timeOfDay4Sorting: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 0 AND 3 THEN   0
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 4 AND 7 THEN   1
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 8 AND 11 THEN  2
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 12 AND 15 THEN 3
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 16 AND 19 THEN 4
                WHEN EXTRACT(HOUR FROM UPDATED_AT) BETWEEN 20 AND 23 THEN 5
            END`,
			type: `string`
		},
	},

	dataSource: `snowflake_iot`
});