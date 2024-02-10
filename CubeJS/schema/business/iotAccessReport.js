cube(`bus_iot_accessReport`, {
    sql: `select * from ${raw_iot_reports_accessReport.sql()}`,

    dimensions: {
        userId: {
            sql: `user_id`,
            type: `string`,
            shown: false
        },
        locationId: {
            sql: `location_id`,
            type: `number`,
            meta: {
                show: true,
                sortable: true
            }
        },
        name: {
            sql: `full_name`,
            type: `string`,
            title: 'Name',
            meta: {
                show: true,
                sortable: true
            }
        },
        email: {
            sql: `email`,
            type: `string`,
            title: 'Email',
            meta: {
                show: true,
                sortable: true
            }
        },
        type: {
            sql: `INITCAP(role_type)`,
            type: `string`,
            title: 'Type',
            meta: {
                show: true,
                sortable: true,
                filterPosition: 'key,label'
            }
        },
        company: {
            sql: `customer_name`,
            type: `string`,
            title: 'Company',
            meta: {
                show: true,
                sortable: true,
                size: 110
            }
        },
        credentialTypes: {
            sql: `credential_types`,
            type: `string`,
            title: 'Credential Types',
            meta: {
                show: true,
                sortable: true,
                size: 150
            }
        },
        credentialHistory: {
            sql: `INITCAP(user_access_status)`,
            type: `string`,
            title: 'Credential History',
            meta: {
                show: true,
                sortable: true,
                filterPosition: 'key,label',
                size: 150
            }
        },
        unit: {
            sql: `location_name`,
            type: `string`,
            title: 'Unit',
            meta: {
                show: true,
                sortable: true,
                size: 78,
                styleType:'textLeft'
            }
        },
        occupied: {
            sql: `case when unit_status = 'OCCUPIED' then true else false end`,
            type: `boolean`,
            title: 'Occupied',
            meta: {
                toggleDefault: false,
                styleType:'check',
                size: 110,
                show: true,
                sortable: true,
                filterPosition: 'key',
                toggleable: true,
                toggleTitle: 'show only occupied units'
            }
        },
        communityId: {
            sql: `apartment_community_id`,
            type: `number`,
            primaryKey: true,
            shown: true
        },
        companyPasses: {
            sql: `PASSES_COUNT`,
            type: `number`,
            title: "company Passes",
            meta: {
                show: true,
                sortable: true,
                size: 78,
                styleType:'TEXTLEFT'
            }
        },
        startDate: {
            sql: `TO_DATE(time_from)`,
            type: `string`,
            title: 'Start Date',
            shown: true,
            meta: {
                show: true,
                styleType:'longDate',
                sortable: true
            }
        },
        endDate: {
            sql: `TO_DATE(time_to)`,
            type: `string`,
            shown: true,
            title: 'End Date',
            meta: {
                show: true,
                styleType:'longDate',
                sortable: true
            }
        }
    },

    dataSource: `snowflake_iot`
  });
