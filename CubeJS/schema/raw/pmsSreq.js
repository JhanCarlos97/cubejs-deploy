cube(`raw_pmssreq_requests`, {   sql: `SELECT * FROM "PMSSREQ"."SERVICE_REQUESTS"`, dataSource: `snowflake_pms`});

cube(`raw_pmssreq_serviceRequestsAssignees`, {    sql: `SELECT * FROM "PMSSREQ"."SERVICE_REQUESTS_ASSIGNEES"`,

dimensions: {
        userId: {
            sql: `USER_ID`,
            type: `string`,
        },

        serviceRequestId: {
            sql: `SERVICE_REQUEST_ID`,
            type: `string`,
        },
    },
  dataSource: `snowflake_pms`
});

cube(`raw_pmssreq_categories`, {   sql: `SELECT * FROM "PMSSREQ"."SREQ_CATEGORIES"`,

dimensions: {
    id: {
        sql: `ID`,
        type: `string`,
    },

    category: {
        sql: `NAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms`});

cube(`raw_pmssreq_customerUsers`, {   sql: `SELECT * FROM "PMSSREQ"."CUSTOMER_USERS"`,

dimensions: {

assignee: {
    sql: `concat(FIRST_NAME,' ',LAST_NAME)`,
    type: `string`,
},

assigneeId: {
    sql: `ID`,
    type: `string`,
},

},

dataSource: `snowflake_pms`});
