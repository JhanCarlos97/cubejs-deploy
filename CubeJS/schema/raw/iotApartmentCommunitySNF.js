cube(`raw_iot_Apartment_CommunitySNF`, {
  
    sql: `
    select 
    id as iot_id,
    qpms_community_id as company_id
    from public.vw_apartment_community`,
    
    
    dimensions: {
      apartmentCommunityId: {
        sql: 'company_id',
        type: 'string'
      }

    },

    dataSource: `snowflake_iot`
  });
