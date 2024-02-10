cube(`bus_iot_temperatureSettingsReport`, {
	sql: `
    select * from ${raw_iot_intermediate_thermostatMetrics.sql()}
    `,

	measures: {
		maxTemperature: {
			sql: `MEASURED_TEMPERATURE`,
			type: `max`,
			title: 'Max Temperature',
			meta: {
				shortTitle: "Maximum temperature",
				order: 0,
				styleType: "total",
				series: "Maximum",
				color: "#FF6F48"
			}
		},
		thirdQuartile: {
			sql: `PERCENTILE_CONT(.75) WITHIN GROUP (ORDER BY MEASURED_TEMPERATURE)`,
			type: `number`,
			title: 'Third Quartile',
			meta: {
				shortTitle: "Third quartile of the temperature distribution.",
				order: 1,
				styleType: "total",
				series: "Third quartile",
				color: "#E5E5E5",
				hiddenLegend: true				
			}
		},
		medTemperature: {
			sql: `MEDIAN(MEASURED_TEMPERATURE)`,
			type: `number`,
			title: 'Median temperature',
			meta: {
				shortTitle: "Median Temperature",
				order: 2,
				styleType: "total",
				series: "Median",
				color: "#E560A3"				
			}
		},
		firstQuartile: {
			sql: `PERCENTILE_CONT(.25) WITHIN GROUP (ORDER BY MEASURED_TEMPERATURE)`,
			type: `number`,
			title: 'First Quartile',
			meta: {
				shortTitle: "First quartile of the temperature distribution.",
				order: 3,
				styleType: "total",
				series: "First quartile",
				color: "#E5E5E5",
				hiddenLegend: true				
			}
		},
		minTemperature: {
			sql: `MEASURED_TEMPERATURE`,
			type: `min`,
			title: 'Min Temperature',
			meta: {
				shortTitle: "Minimum temperature",
				order: 4,
				styleType: "total",
				series: "Minimun",
				color: "#3498DB"				
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
			type: `time`,
			title: 'Date',
			meta: {
				styleType: "label"
			}
		},
	},

	dataSource: `snowflake_iot`
});