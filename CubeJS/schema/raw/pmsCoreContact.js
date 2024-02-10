cube(`raw_pmscorecontact_entityScopeAlias`, {   sql: `SELECT * FROM "PMSCORECONTACT"."ENTITY_SCOPE_ALIAS"`, dataSource: `snowflake_pms`});
cube(`raw_pmscorecontact_entityAddress`, {   sql: `SELECT * FROM "PMSCORECONTACT"."ENTITY_ADDRESS"`, dataSource: `snowflake_pms`});
cube(`raw_pmscorecontact_address`, {   sql: `SELECT * FROM "PMSCORECONTACT"."ADDRESS"`, dataSource: `snowflake_pms`});
cube(`raw_pmscorecontact_entityEmail`, {   sql: `SELECT * FROM "PMSCORECONTACT"."ENTITY_EMAIL" `,

dimensions: {      
    emailAddress: {
        sql: `EMAIL_ADDRESS`,
        type: `string`,      
    },
},

dataSource: `snowflake_pms`});
cube(`raw_pmscorecontact_entityPhone`, {   sql: `SELECT * FROM "PMSCORECONTACT"."ENTITY_PHONE" `, 

dimensions: {      
    phoneNumber: {
        sql: `case when upper(PHONE_USE_DESCRIPTION) = 'WORK' then null else PHONE_NUMBER end`,
        type: `string`,      
    },

    workNumber: {
        sql: `case when upper(PHONE_USE_DESCRIPTION) = 'WORK' then PHONE_NUMBER else null end`,
        type: `string`,      
    },


    contactPreference: {
        sql: `CONTACT_PREFERENCE`,
        type: `string`,      
    },
},


dataSource: `snowflake_pms`});
