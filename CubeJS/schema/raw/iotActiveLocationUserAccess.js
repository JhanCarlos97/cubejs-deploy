cube(`raw_iot_activeLocationUserAccess`, {
    sql: `
    SELECT * FROM active_location_user_access
    `,

    dimensions:
      {
        userId: {
              sql: `${CUBE}.user_id`,
              type: `string`,
              primaryKey: true,
              shown: true
        },

        fullName: {
              sql: `${CUBE}.full_name`,
              type: `string`
        },

        roleType: {
            sql: `${CUBE}.role_type`,
            type: `string`
        },

        activeFrom: {
          sql: `${CUBE}.active_from`,
          type: `time`
        },

        activeTo: {
          sql: `${CUBE}.active_to`,
          type: `time`
        },

        scheduleName: {
          sql: `${CUBE}.schedule_name`,
          type: `string`
        },

        scheduleId: {
          sql: `${CUBE}.schedule_id`,
          type: `string`
        },


      },
    
    dataSource: `postgres_iot`
  });