cube(`bus_iot_Resident_Summary`, {
	sql: `
Select
   *
from ${stg_iot_Resident_Summary.sql()} a 
`,

	measures: {
	},

	dimensions: {
        communityId: {
            sql: `apartment_community_id`,
            type: `string`,
            primaryKey: true,
            shown: true
        },		
		order: {
			sql: `order`,
			type: `number`,
			shown: true
		},
		eventType: {
			sql: `event_Type`,
			type: `string`,
			shown: true
		},
		value: {
			sql: `value`,
			type: `number`,
			shown: true
		},
		color: {
			sql: `case when value > 0 then 'ED441B' else '0CA549' end`,
			type: `string`,
			shown: true
		}
	},

	dataSource: `postgres_iot`
});
