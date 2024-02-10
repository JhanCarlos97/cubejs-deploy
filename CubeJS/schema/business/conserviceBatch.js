cube(`bus_provider_batch`, {
    sql:`SELECT
    ch.NOTES
    ,c.community_id AS BUSINESS_UNIT_ID
    ,ch.CODE_ID
    ,C.name as charge_code_description
    FROM ${raw_pmsaccounting_charge.sql()} ch
    LEFT JOIN ${raw_pmsaccounting_code.sql()} C on C.id = ch.code_id
    where C.DELETED_AT is null
    AND (${FILTER_PARAMS.bus_provider_batch.batch.filter((value) => `ch.NOTES like '%Batch: ${value} %'`)})
    `,
    dimensions: {
        
        batch: {
            sql: `${CUBE}."NOTES"`,
            type: `string`
        },
            
        chargeCodeId: {
            sql: `${CUBE}."CODE_ID"`,
            type: `string`
        },
            
        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,
            type: `string`
        },
            
        chargeCodeDescription: {
            sql: `${CUBE}."CHARGE_CODE_DESCRIPTION"`,
            type: `string`
        },

    },

    dataSource: `snowflake_pms`
  });
