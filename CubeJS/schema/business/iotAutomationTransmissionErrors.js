cube(`bus_iot_Automation_Transmission_Errors`, {
    sql: `
    Select   
    0 as qty, 
    unnest(ARRAY['Vacant Units', 'Move-Ins']) as unit_status,
    company_id as apartment_community_id
    From ${raw_iot_Apartment_Community.sql()} d
    union all
  Select
     qty, unit_status, apartment_community_id    
  from ${stg_iot_Automation_Transmission_Errors.sql()} a 
  `,

    measures: {
      quantity: {
        type: `number`,
        sql: `sum(qty)`
        },   
    }, 
   dimensions: {

      communityId: {
        sql: `apartment_community_id`,
        type: `string`,        
        shown: true
        },
      unitStatus: {
      sql: `unit_status`,
      type: `string`,        
      shown: true,
      primaryKey: true
      },
      order:
          {
            sql: `case ${unitStatus} when 'Vacant Units' then 1
            when 'Move-Ins' then 2
            end`,
            type: `number`,        
            shown: true
          },

      color: {
        sql: `case when ${quantity} > 0 then 'ED441B' else '0CA549' end`,
        type: `string`,        
        shown: true,
        subQuery: true,
      propagateFiltersToSubQuery: true
        }, 

      },

      dataSource: `postgres_iot`
    });

