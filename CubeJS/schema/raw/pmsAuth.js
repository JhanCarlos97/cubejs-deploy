cube(`raw_pmsauth_communities`, {   sql: `SELECT * FROM "PMSAUTH"."COMMUNITIES"`, 

dimensions: {      
    timeZoneId: {
        sql: `TIMEZONE_ID`,
        type: `string`,      
    },

    id: {
        sql: `ID`,
        type: `string`,      
    },

    name: {
        sql: `NAME`,
        type: `string`,      
    },

    customerId: {
        sql: `CUSTOMER_ID`,
        type: `string`,      
    },
},

dataSource: `snowflake_pms`});

cube(`raw_pmsauth_customers`, {   sql: `SELECT * FROM "PMSAUTH"."CUSTOMERS"`, 

dimensions: {      
    id: {
        sql: `ID`,
        type: `string`,      
    },

    name: {
        sql: `NAME`,
        type: `string`,      
    }
},

dataSource: `snowflake_pms`});