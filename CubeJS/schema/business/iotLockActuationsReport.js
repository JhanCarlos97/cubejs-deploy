cube(`bus_iot_LockActuationsReport`, {
	sql: `
    select * from ${raw_iot_staging_lockAccess.sql()}
    `,

    measures: {
        actuations: {
            sql: `1`,
            type: `count`,
            title: 'Thermostat Adjustments',
            meta: {
                styleType: "total",
                series: "Median Delta",
                color: "#3498DB"
            }
        }
    },

	dimensions: {
		communityId: {
			sql: `apartment_community_id`,
			type: `number`,
			primaryKey: true,
			shown: true
		},
		timestamp: {
			sql: `TIMESTAMP`,
			type: `time`
		},
		timeOfDay2Sorting: {
            meta: {
                shown: false
            },
            sql: `CASE 
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 0 AND 1 THEN   1
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 2 AND 3 THEN   2
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 4 AND 5 THEN   3
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 6 AND 7 THEN   4
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 8 AND 9 THEN   5
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 10 AND 11 THEN 6
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 12 AND 13 THEN 7
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 14 AND 15 THEN 8
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 16 AND 17 THEN 9
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 18 AND 19 THEN 10
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 20 AND 21 THEN 11
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 22 AND 23 THEN 12
            END`,
			type: `string`
		},
		timeOfDay2: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 0 AND 1 THEN   '12 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 2 AND 3 THEN   '02 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 4 AND 5 THEN   '04 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 6 AND 7 THEN   '06 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 8 AND 9 THEN   '08 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 10 AND 11 THEN '10 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 12 AND 13 THEN '12 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 14 AND 15 THEN '02 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 16 AND 17 THEN '04 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 18 AND 19 THEN '06 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 20 AND 21 THEN '08 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 22 AND 23 THEN '10 pm'
            END`,
			type: `string`
		},
		timeOfDay4: {
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 0 AND 3 THEN   '12 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 4 AND 7 THEN   '04 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 8 AND 11 THEN  '08 am'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 12 AND 15 THEN '12 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 16 AND 19 THEN '04 pm'
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 20 AND 23 THEN '08 pm'
            END`,
			type: `string`
		},
		timeOfDay4Sorting: {
            meta: {
                shown: false
            },
			sql: `CASE 
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 0 AND 3 THEN   0
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 4 AND 7 THEN   1
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 8 AND 11 THEN  2
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 12 AND 15 THEN 3
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 16 AND 19 THEN 4
                WHEN EXTRACT(HOUR FROM TIMESTAMP) BETWEEN 20 AND 23 THEN 5
            END`,
			type: `string`
		},
	},

	dataSource: `snowflake_iot`
});