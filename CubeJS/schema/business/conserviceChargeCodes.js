cube(`bus_provider_chargesCodes`, {
    sql: `SELECT * FROM ${raw_pmsaccounting_charge.sql()}`,

    joins: {

        raw_pmsaccounting_code: {
          sql: `
          ${raw_pmsaccounting_code}.id = ${bus_provider_chargesCodes.chargeCodeId}`,
          relationship: `hasOne`
        },

    },
        
    dimensions: {
        
        chargeCodeName: {
            sql: `${raw_pmsaccounting_code.chargeCodeName}`,
            type: `string`
        },
            
        chargeCodeId: {
            sql: `${CUBE}."CODE_ID"`,
            type: `string`
        },
            
        businessUnitId: {
            sql: `${raw_pmsaccounting_code.businessUnitId}`,
            type: `string`
        }
    },

    measures: {

        endDate: {
            sql: `max(${CUBE}."DUE_DATE")`,
            type: `time`
        },
            
        startDate: {
            sql: `max(${CUBE}."POST_DATE")`,
            type: `time`
        }

    },
    
    dataSource: `snowflake_pms`

    }
);
