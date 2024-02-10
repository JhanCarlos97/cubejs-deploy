cube(`bus_iot_AccessEvents`, {
    extends: raw_iot_lockAccess,    
        
    joins: {

      raw_iot_userTable: {
        sql: `
        ${CUBE.userId} = ${raw_iot_userTable}.id`,
        relationship: `belongsTo`
      },

      raw_iot_location: {
        sql: `${CUBE.locationId} = ${raw_iot_location}.id`,
        relationship: `belongsTo`
      },

    },

    measures: {
      quantity: {
        type: `number`,
        sql: `coalesce(count(1),0)`,
        title: `Anomalous Access Events`,
        },    
    },       

      dimensions: {

        userId: {
            sql: `${CUBE}.user_id`,
            type: `string`,
            primaryKey: true,
            shown: true
        },
    
        locationId: {
            sql: `${CUBE}.location_id`,
            type: `string`
        },

        id: {
            sql: `${CUBE}.id`,
            type: `string`
        },
    
        timestamp: {
            sql: `${CUBE}.timestamp`,
            type: `time`
        },

        localTimestamp: {
            sql: `${CUBE.timestamp} AT TIME ZONE ${raw_iot_Apartment_Community.localTimeZone}`,
            type: `time`
        },

        localHour: {
            sql: `EXTRACT(HOUR FROM ${CUBE.localTimestamp})`,
            type: `time`
        },

        localDow: {
            sql: `EXTRACT(DOW FROM ${CUBE.localTimestamp})`,
            type: `time`
        },

        roleType: {
            sql: `${CUBE}.role_type`,
            type: `string`
        },
    
    },

    segments: {
        mainSegment: {
            sql: `
            ${raw_iot_companyRole.roleType} IN ('PROPERTY_STAFF', 'PROPERTY_MANAGER') 
            AND (${CUBE.localHour} < 9 
                OR ${CUBE.localHour} > 18
                OR  ${CUBE.localDow} IN (0, 6)
                )`
        },

    },
    
    dataSource: `postgres_iot`
  });