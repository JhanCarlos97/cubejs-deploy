cube(`raw_iot_companyRole`, {
    sql: `
    SELECT * FROM company_role
    `,

    dimensions:
    {
        roleType: {
            sql: `${CUBE}.role_type`,
            type: `string`
        },
    },
    
    dataSource: `postgres_iot`
  });