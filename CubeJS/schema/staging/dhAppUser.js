cube(`stg_another_provider_AppUser`, {
    sql: `SELECT * FROM ${raw_another_provider_AppUser.sql()}`,
    
    
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [idAppUser, customerId, firstName, lastName, createdAt, updatedAt]
      }
    },
    
    dimensions: {
      appUserPassword: {
        sql: `app_user_password`,
        type: `string`
      },
      
      rememberToken: {
        sql: `remember_token`,
        type: `string`
      },
      
      officeNumber: {
        sql: `office_number`,
        type: `string`
      },
      
      idAppUser: {
        sql: `id_app_user`,
        type: `string`
      },
      
      customerId: {
        sql: `customer_id`,
        type: `string`,
        primaryKey: true
      },
      
      firstName: {
        sql: `first_name`,
        type: `string`
      },
      
      lastName: {
        sql: `last_name`,
        type: `string`
      },
      
      mobile: {
        sql: `mobile`,
        type: `string`
      },
      
      email: {
        sql: `email`,
        type: `string`
      },
      
      createdAt: {
        sql: `created_at`,
        type: `time`
      },
      
      updatedAt: {
        sql: `updated_at`,
        type: `time`
      },
      
      emailVerifiedAt: {
        sql: `email_verified_at`,
        type: `time`
      },
  
      person: {
        sql: `${firstName} || ' ' || ${lastName}`,
        type: `string`,
        title: `Person`,
        meta: {
          styleType: 'textLeft',
          sortable: true,
          fixed: true,
          size: 95,
          show: true
        }
      },
  
      personNotFixed: {
        sql: `${person}`,
        type: `string`,
        title: `Person`,
        meta: {
          styleType: 'text',
          sortable: true,
          size: 95,
          show: true
        }
      },
  
    },
    
    dataSource: `snowflake_vendor_source`
  });
  