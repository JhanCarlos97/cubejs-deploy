cube(`bus_iot_temperatureDeltaReport`, {
	sql: `
    select * from ${raw_iot_intermediate_thermostatMetrics.sql()}
    `,

	measures: {
		medCoolSetpoint: {
			sql: `MEDIAN(COOL_SETPOINT_TEMPERATURE)`,
			type: `number`,
			title: 'Median Cool Setpoint',
			meta: {}
		},
		medTemperature: {
			sql: `MEDIAN(MEASURED_TEMPERATURE)`,
			type: `number`,
			title: 'Median Temperature',
			meta: {}
		},
		medHeatSetpoint: {
			sql: `MEDIAN(HEAT_SETPOINT_TEMPERATURE)`,
			type: `number`,
			title: 'Median Heat Setpoint',
			meta: {}
		},
		medDelta: {
			sql: `MEDIAN(TEMPERATURE_DELTA)`,
			type: `number`,
			title: 'Median Delta',
			meta: {
				styleType: "total",
				series: "Median Delta",
				color: "#3498DB"
			}
		},
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