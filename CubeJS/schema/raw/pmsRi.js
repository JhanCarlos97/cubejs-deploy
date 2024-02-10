cube(`raw_pmsri_reservations`, {   sql: `SELECT * FROM "PMSRI"."RI_RESERVATIONS"`, dataSource: `snowflake_pms`});
cube(`raw_pmsri_offers`, {   sql: `SELECT * FROM "PMSRI"."RI_OFFERS"`,
dimensions: {
    id: {
        sql: `id`,
        type: `string`,
    },

    recurrentAmount: {
        sql: `ts_rate`,
        type: `number`,        
    },

    rentableItems: {
        sql: `name`,
        type: `string`,
        meta: {
            styleType: 'text',
            show: true,
            filterPosition: 'key,label'
          } 
        },

        communityId: {
            sql: `community_id`,
            type: `string`,        
            },    


},
dataSource: `snowflake_pms`});
cube(`raw_pmsri_offers_items`, {   sql: `SELECT * FROM "PMSRI"."RI_OFFER_ITEMS"`,
dimensions: {
    id: {
        sql: `id`,
        type: `string`,
    },
},
dataSource: `snowflake_pms`});
cube(`raw_pmsri_profiles`, {   sql: `SELECT * FROM "PMSRI"."PROFILES"`,
dimensions: {
    id: {
        sql: `id`,
        type: `string`,
    },
    communityId: {
        sql: `COMMUNITY_ID`,
        type: `string`,
    },
},
dataSource: `snowflake_pms`});
cube(`raw_pmsri_persons`, {   sql: `SELECT * FROM "PMSRI"."PERSONS"`, 
dimensions: {
    id: {
        sql: `id`,
        type: `string`,
    },

    residents: {
        sql: `first_name || ' '  || last_name`,
        type: `string`,
    },
},
dataSource: `snowflake_pms`});

