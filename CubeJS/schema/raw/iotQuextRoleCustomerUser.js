cube(`raw_iot_companyRoleCustomerUser`, {
    sql: `
    SELECT * FROM company_role_customer_user
    `,
    
    joins: {

        raw_iot_companyRole: {
          sql: `
          ${raw_iot_companyRoleCustomerUser}.company_role_id = ${raw_iot_companyRole}.id`,
          relationship: `belongsTo`
        },
  
      },

    dataSource: `postgres_iot`
  });