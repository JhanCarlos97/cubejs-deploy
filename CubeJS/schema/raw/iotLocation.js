cube(`raw_iot_location`, {
    sql: `select 
    id,
    created_at,
    updated_at,
    name,
    location_type,
    state,
    parent_id,
    -- lora_gateway_id,
    description,
    apartment_community_id as iot_id
    ,location_flag,
    unit_status,
    building_id,
    company_id as apartment_community_id
    from location a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id`,

    dimensions: {
      apartmentCommunityId: {
        sql: `${CUBE}.apartment_community_id`,
        type: `string`
    },
    },

    joins: {

      raw_iot_Apartment_Community: {
        sql: `
        ${raw_iot_location}.apartment_community_id = ${raw_iot_Apartment_Community}.company_id`,
        relationship: `belongsTo`
      },

    },
    
    dataSource: `postgres_iot`
  });