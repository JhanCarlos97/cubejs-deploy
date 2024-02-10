cube(`bus_iot_deviceStatusReport`, {
    sql: `
    select * from ${raw_iot_reports_deviceStatusReport.sql()}
    `,

    measures: {
        lowBattery: {
            sql: `DISTINCT CASE WHEN main_battery_state IN ('LOW', 'CRITICAL') THEN device_id END`,
            type: `count`,
            title: 'Critical or Low Battery',
            meta: {
                styleType: 'textLeft',
                show: true,
                size: 106,
                group: 1,
                layout: 'row'
            }
        },
        offline: {
            sql: `DISTINCT CASE WHEN device_communication_status = 'OFFLINE' THEN device_id END`,
            type: `count`,
            title: 'Offline',
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
        deviceType: {
            sql: `device_type`,
            type: `string`,
            title: 'Device',
            meta: {
                styleType: 'Icon',
                subType: 'Devices',
                sortable: true,
                show: false,
                isInnerData: true,
                filterPosition: "key,label"
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
                preTextIconType: 'devices',
                preTextIcon: 'bus_iot_deviceStatusReport.deviceType'
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
                styleType: 'collapse',
                sortable: true,
                show: true
            }            
        },
        locationTree: {
            sql: `location_tree`,
            type: `string`,
            title: 'Location',
            meta: {
                sortable: true,
                show: true
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
    },

    dataSource: `snowflake_iot`
  });