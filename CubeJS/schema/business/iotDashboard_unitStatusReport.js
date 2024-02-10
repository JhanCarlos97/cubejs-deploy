cube(`bus_iotDashboard_unitStatusReport`, {
    sql: `SELECT * FROM ${raw_iotDashboard_unitStatusReport.sql()}`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },
    
    joins: {
      
    },
    
    measures: {
        countDistinctFullname: {
        sql: `COUNT(DISTINCT ${bus_iotDashboard_unitStatusReport.fullName})`,
        type: `number`
        },

        usersWithAccess: {
          sql: `listagg(distinct ${CUBE.fullName}, ', ') WITHIN GROUP (ORDER BY ${CUBE.fullName})`,
          type: `number`
        },
    },
    
    dimensions: {
      avgCoolChangeRate: {
        sql: `${CUBE}."AVG_COOL_CHANGE_RATE"`,
        type: `string`
      },

      unitId: {
        sql: `${CUBE}."APARTMENT_COMMUNITY_ID"`,
        type: `string`
      },
      
      deviceId: {
        sql: `${CUBE}."DEVICE_ID"`,
        type: `string`
      },
      
      locationName: {
        sql: `${CUBE}."LOCATION_NAME"`,
        type: `string`
      },
      
      roleType: {
        sql: `${CUBE}."ROLE_TYPE"`,
        type: `string`
      },
      
      fullName: {
        sql: `${CUBE}."FULL_NAME"`,
        type: `string`
      },
      
      mainBatteryState: {
        sql: `${CUBE}."MAIN_BATTERY_STATE"`,
        type: `string`
      },
      
      unitStatus: {
        sql: `${CUBE}."UNIT_STATUS"`,
        type: `string`
      },
      
      heatSetpointTemperature: {
        sql: `${CUBE}."HEAT_SETPOINT_TEMPERATURE"`,
        type: `string`
      },
      
      avgHeatChangeRate: {
        sql: `${CUBE}."AVG_HEAT_CHANGE_RATE"`,
        type: `string`
      },
      
      coolSetpointTemperature: {
        sql: `${CUBE}."COOL_SETPOINT_TEMPERATURE"`,
        type: `string`
      },
      
      deviceType: {
        sql: `${CUBE}."DEVICE_TYPE"`,
        type: `string`
      },
      
      deviceCommunicationStatus: {
        sql: `${CUBE}."DEVICE_COMMUNICATION_STATUS"`,
        type: `string`
      },
      
      thermostatMode: {
        sql: `${CUBE}."THERMOSTAT_MODE"`,
        type: `string`
      },
      
      lastSeen: {
        sql: `${CUBE}."LAST_SEEN"`,
        type: `time`
      }
    },
    
    dataSource: `snowflake_iot`
  });
  