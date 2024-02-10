cube(`raw_iot_intermediate_lockMetrics`,
	{
		sql: `
			SELECT
				a.* RENAME(apartment_community_id as iot_id), 
				b.company_id as apartment_community_id
			FROM IOT_INTERMEDIATE.LOCK_METRICS a
			LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
			ON a.apartment_community_id = b.iot_id
		`,
		dataSource: `snowflake_iot`
	}
);

cube(
	`raw_iot_intermediate_thermostatMetrics`,
	{
		sql: `
			SELECT
				a.* RENAME(apartment_community_id as iot_id), 
				b.company_id as apartment_community_id
			FROM IOT_INTERMEDIATE.THERMOSTAT_METRICS a
			LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
			ON a.apartment_community_id = b.iot_id
		`,
		dataSource: `snowflake_iot`
	}
);
