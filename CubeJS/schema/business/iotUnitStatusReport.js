cube(`bus_iot_unitStatusReport`, {
    sql: `
    select * from ${raw_iot_reports_unitStatusReport.sql()}
    `,

    measures: {
        lowBattery: {
            sql: `DISTINCT CASE WHEN main_battery_state IN ('LOW', 'CRITICAL') THEN device_id END`,
            type: `count`,
            title: 'Critical or Low Battery',
            meta: {
                styleType: 'textLeft',
                show: true,
                size: 100,
                group: 1,
                layout: 'row'
            }
        },
        offline: {
            sql: `DISTINCT CASE WHEN device_communication_status = 'OFFLINE' THEN device_id END`,
            type: `count`,
            title: 'Offline devices',
            meta: {
                styleType: 'textLeft',
                show: true,
                size: 106,
                group: 2,
                layout: 'row'
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
        locationId: {
            sql: `location_id`,
            type: `number`,
            title: 'Location ID',
            meta: {
                show: false
            }            
        },
        locationName: {
            sql: `location_name`,
            type: `string`,
            title: 'Unit',
            meta: {
                styleType: 'textLeft',
                sortable: true,
                show: true,
                size: 91
            }
        },
        deviceId: {
            sql: `device_id`,
            type: `string`,
            title: 'Device ID',
            meta: {
                styleType: 'textLeft',
                sortable: true,
                show: true,
                filterPosition: 'key,label',
                preTextIconType: 'devices',
                preTextIcon: 'bus_iot_unitStatusReport.deviceType'
            }            
        },
        deviceType: {
            sql: `device_type`,
            type: `string`,
            title: 'Device',
            meta: {
                styleType: 'Icon',
                subType: 'Devices',
                sortable: true,
                show: false,
                filterPosition: "key,label"
            }            
        },
        userList: {
            sql: `user_list`,
            type: `string`,
            title: 'User with Access',
            meta: {
                styleType: 'textLeft',
                sortable: true,
                show: true,
                size: 150
            }            
        },
        occupied: {
            sql: `case when unit_status = 'OCCUPIED' then true else false end`,
            type: `boolean`,
            title: 'Occupied',
            meta: {
                styleType: 'check',
                sortable: true,
                show: true,
                size: 84,
                toggleable: true,
                toggleTitle: 'show only occupied units',
                toggleDefault: false,
                filterPosition: 'key'
            }         
        },
        mainBatteryState: {
            sql: `main_battery_state`,
            type: 'string',
            title: 'Battery',
            meta: {
                styleType: 'Icon',
                subType: 'Battery',
                sortable: true,
                show: true,
                size: 80,
                filterPosition: 'key,label'
            }
        },
        deviceCommunicationStatus: {
            sql: `device_communication_status`,
            type: `string`,
            title: 'Connectivity',
            meta: {
                styleType: 'Icon',
                subType: 'Connectivity',
                sortable: true,
                show: true,
                size: 100,
                filterPosition: 'key,label'
            }            
        },
        lastSeen: {
            sql: `last_seen`,
            type: `time`,
            title: 'Last Seen',
            meta: {
                styleType: 'longDate',
                sortable: true,
                show: true
            }
        }
    },

    dataSource: `snowflake_iot`
  });