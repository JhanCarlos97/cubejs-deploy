cube(`raw_iot_userTable`, {
    sql: `
    SELECT * FROM user_table
    `,
    
    joins: {

        raw_iot_companyRoleCustomerUser: {
          sql: `
          ${raw_iot_userTable}.id = ${raw_iot_companyRoleCustomerUser}.customer_user_id`,
          relationship: `belongsTo`
        },
  
      },

    dimensions:
    {
        fullName: {
            sql: `CONCAT(${CUBE}.first_name, ' ', ${CUBE}.last_name)`,
            type: `string`
        },
    },

    dataSource: `postgres_iot`
  });