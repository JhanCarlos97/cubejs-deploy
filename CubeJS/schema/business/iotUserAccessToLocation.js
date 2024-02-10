cube(`bus_iot_userAccessToLocation`, {
    sql: `
    select * from ${raw_iot_User_Access_To_LocationSNF.sql()}
    `,

    dimensions: {
        communityId: {
			sql: `apartment_community_id`,
			type: `number`,
			primaryKey: true,
			shown: true
		},
        userId: {
			sql: `user_id`,
			type: `number`,
			shown: true,
            meta: {
                styleType: 'key'
            }
		},
        userName: {
			sql: `FULL_NAME`,
			type: `number`,
			shown: true,
            meta: {
                styleType: 'label'
            }
		},
    },

    dataSource: `snowflake_iot`
  });