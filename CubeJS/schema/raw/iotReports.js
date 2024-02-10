cube(`raw_iot_reports_averageTemperatureReport`, { sql: `SELECT * FROM IOT_REPORTS.AVERAGE_TEMPERATURE_REPORT`, dataSource: `snowflake_iot` });
cube(`raw_iot_reports_thermostatAdjustmentsTimeOfDayReport`, { sql: `SELECT * FROM IOT_REPORTS.THERMOSTAT_ADJUSTMENTS_BY_TIME_OF_DAY_REPORT`, dataSource: `snowflake_iot` });
cube(`raw_iot_reports_temperatureSettingsReport`, { sql: `SELECT * FROM IOT_REPORTS.TEMPERATURE_SETTINGS_REPORT`, dataSource: `snowflake_iot` });

cube(
    `raw_iot_staging_lockAccess`, 
    { sql: `
        SELECT
            a.* RENAME(apartment_community_id as iot_id), 
            b.company_id as apartment_community_id
        FROM IOT_STAGING.LOCK_ACCESS_STG a
        LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
        ON a.apartment_community_id = b.iot_id
        `,
        dataSource: `snowflake_iot` 
    }
);


cube(`raw_iot_reports_deviceStatusReport`, {
        sql: `
            SELECT 
                a.* RENAME(apartment_community_id as iot_id), 
                b.company_id as apartment_community_id
            FROM IOT_REPORTS.DEVICE_STATUS_REPORT a
            LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
            ON a.apartment_community_id = b.iot_id
            `, 
            dataSource: `snowflake_iot`
        }
    );

cube(`raw_iot_reports_unitStatusReport`, 
    { 
        sql: `
        SELECT
            a.* RENAME(apartment_community_id as iot_id), 
            b.company_id as apartment_community_id
        FROM IOT_REPORTS.UNIT_STATUS_REPORT a
        LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
        ON a.apartment_community_id = b.iot_id
        `, 
        dataSource: `snowflake_iot` 
    }
);


cube(`raw_iot_reports_accessReport`, 
    { 
        sql: `
            SELECT 
                a.* RENAME(apartment_community_id as iot_id), 
                b.company_id as apartment_community_id
            FROM IOT_REPORTS.ACCESS_REPORT a
            LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
            ON a.apartment_community_id = b.iot_id
        `, 
        dataSource: `snowflake_iot` 
    }
);

cube(
    `raw_iot_reports_thermostatAdjustmentsAppVsDirectReport`, 
    { 
        sql: `
            SELECT 
                a.* RENAME(apartment_community_id as iot_id), 
                b.company_id as apartment_community_id
            FROM IOT_REPORTS.THERMOSTAT_ADJUSTMENT_BY_APP_DIRECT_REPORT a
            LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
            ON a.apartment_community_id = b.iot_id
        `, 
        dataSource: `snowflake_iot`
    }
);

cube(
    `raw_iot_reports_unitUsingSchedulingReport`, 
    {
        sql: `
            SELECT
                a.* RENAME(apartment_community_id as iot_id), 
                b.company_id as apartment_community_id
            FROM IOT_REPORTS.UNITS_USING_SCHEDULING_REPORT a
            LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
            ON a.apartment_community_id = b.iot_id
        `, 
        dataSource: `snowflake_iot`
    }
);

cube(`raw_iot_reports_loraStatisticsReport`, 
    { 
        sql: `
            SELECT
                a.* RENAME(apartment_community_id as iot_id), 
                b.company_id as apartment_community_id
            FROM IOT_REPORTS.LORA_STATISTICS_REPORT a
            LEFT JOIN ${raw_iot_Apartment_CommunitySNF.sql()} b 
            ON a.apartment_community_id = b.iot_id
        `, 
        dataSource: `snowflake_iot` 
    }
);
