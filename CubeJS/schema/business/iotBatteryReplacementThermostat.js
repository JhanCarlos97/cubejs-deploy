cube(`bus_iot_Battery_Replacement_T`, {
  sql: `
  Select   
  unnest(ARRAY['Normal', 'Low', 'Critical']) as state,
  0 as qty,
  company_id as apartment_community_id
  From ${raw_iot_Apartment_Community.sql()} b
  union all
Select state, qty, apartment_community_id
from ${stg_iot_Battery_Replacement_T.sql()} a 
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
    
      batteryState: {
        sql: `state`,
        type: `string`,        
        shown: true
        }, 
    
        order:
        {
            sql: `case ${batteryState} when 'Normal' then 1
            when 'Low' then 2
            when 'Critical' then 3
            end`,
            type: `number`,        
            shown: true
        },

        color:
        {
            sql: `case ${batteryState} when 'Normal' then '0CA549'
            when 'Low' then 'F7C595'
            when 'Critical' then 'ED441B'
            end`,
            type: `string`,        
            shown: true
        }
    },

    dataSource: `postgres_iot`
  });

