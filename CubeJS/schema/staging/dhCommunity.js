cube(`stg_another_provider_Community`, {
    sql: `SELECT * FROM ${raw_another_provider_Community.sql()}`,
  
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [cCity, customerId, timezoneId, idCommunity, cCommunityName, cCommunityShortName, createdAt, updatedAt]
      }
    },
    
    dimensions: {
      cCity: {
        sql: `c_city`,
        type: `string`
      },
      
      cEmail: {
        sql: `c_email`,
        type: `string`
      },
      
      cState: {
        sql: `c_state`,
        type: `string`
      },
      
      cAddress: {
        sql: `c_address`,
        type: `string`
      },
      
      customerId: {
        sql: `customer_id`,
        type: `string`
      },
      
      timezoneId: {
        sql: `timezone_id`,
        type: `string`
      },
      
      idCommunity: {
        sql: `id_community`,
        type: `string`,
        primaryKey: true,
        shown: true
      },
      
      cPostalCode: {
        sql: `c_postal_code`,
        type: `string`
      },
      
      cPhoneNumber: {
        sql: `c_phone_number`,
        type: `string`
      },
      
      cCommunityName: {
        sql: `c_community_name`,
        type: `string`,
        title: `Community`,
        meta: {
          styleType: 'textLeft',
          sortable: true,
          fixed: true,
          size: 156,
          show: true
        }
      },
  
      cCommunityNameNotFixed: {
        sql: `${cCommunityName}`,
        type: `string`,
        title: `Community`,
        meta: {
          styleType: 'text',
          sortable: true,
          size: 156,
          show: true
        }
      },
      
      smsPhoneNumber: {
        sql: `sms_phone_number`,
        type: `string`
      },
      
      geographicLocation: {
        sql: `geographic_location`,
        type: `string`
      },
      
      cCommunityShortName: {
        sql: `c_community_short_name`,
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
      
      disabledAt: {
        sql: `disabled_at`,
        type: `time`
      }
    },
    
    dataSource: `snowflake_vendor_source`
  });
  