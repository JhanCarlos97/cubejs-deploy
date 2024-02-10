cube(`bus_iot_AccessAuthorization`, {
    extends: raw_iot_lockCredentialsSchedule,    
        
    joins: {

      raw_iot_activeLocationUserAccess: {
        sql: `
        ${CUBE.id} = ${raw_iot_activeLocationUserAccess}.schedule_id`,
        relationship: `belongsTo`
      },


    },

    measures: {
        quantity: {
          type: `number`,
          sql: `coalesce(count(1),0)`,
          title: `Anomalous Access Authorization`,
          },    
      },      
      
      dimensions: {

        id: 
            {
                sql: `${CUBE}.id`,
                type: `string`,
                primaryKey: true,
                shown: true
            },

        apartmentCommunityId: 
            {
                sql: `${CUBE}.apartment_community_id`,
                type: `string`
            },

        timeFrom: 
            {
                sql: `${CUBE}.time_from`,
                type: `string`
            },

        timeTo: 
            {
                sql: `${CUBE}.time_to`,
                type: `string`
            },

        daysOfWeek: 
            {
                sql: `${CUBE}.days_of_week`,
                type: `string`
            },
    
    },

    segments: {
        mainSegment: {
            sql: `
            ${raw_iot_activeLocationUserAccess.roleType} IN ('PROPERTY_STAFF', 'PROPERTY_MANAGER') 
            AND CURRENT_TIMESTAMP BETWEEN ${raw_iot_activeLocationUserAccess.activeFrom} AND ${raw_iot_activeLocationUserAccess.activeTo}
            AND (${CUBE.timeFrom} < '9:00:00' 
                OR ${CUBE.timeTo} > '18:00:00'
                OR 'SATURDAY' IN (${CUBE.daysOfWeek})
                OR 'SUNDAY' IN (${CUBE.daysOfWeek})
                )`
        },

    },
    
    dataSource: `postgres_iot`
  });