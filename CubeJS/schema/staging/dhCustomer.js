cube(`stg_another_provider_Customer`, {
  sql: `SELECT * FROM ${raw_another_provider_Customer.sql()}`,
  
joins: {

    stg_another_provider_AppUser: {
      sql: `${stg_another_provider_Customer.idCustomer} = ${stg_another_provider_AppUser.customerId}`,
      relationship: `belongsTo`
    },
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [idCustomer, cCustomerName, createdAt]
    },
    
    cPhoneNumber: {
      sql: `c_phone_number`,
      type: `sum`
    }
  },
  
  dimensions: {
    isActive: {
      sql: `is_active`,
      type: `string`
    },
    
    cEmail: {
      sql: `c_email`,
      type: `string`
    },
    
    idCustomer: {
      sql: `id_customer`,
      type: `string`,
      primaryKey: true
    },
    
    cCustomerName: {
      sql: `c_customer_name`,
      type: `string`,
      title: `Customer`,
      meta: {
        styleType: 'textLeft',
        sortable: true,
        fixed: true,
        size: 142,
        show: true
      }
    },
    
    cCustomerNameNotFixed: {
      sql: `${cCustomerName}`,
      type: `string`,
      title: `Customer`,
      meta: {
        styleType: 'text',
        sortable: true,
        size: 142,
        show: true
      }
    },
    
    cLogoFileLocation: {
      sql: `c_logo_file_location`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    disabledAt: {
      sql: `disabled_at`,
      type: `time`
    }
  },

  segments: {

    defaultSegment: {
      sql: `${stg_another_provider_Customer.idCustomer} IS NOT NULL`
    },
  },
  
  dataSource: `snowflake_vendor_source`
});
