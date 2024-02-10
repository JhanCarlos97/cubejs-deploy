cube(`bus_iot_Device_Comm_Failures`, {
    sql: `
Select   
unnest(ARRAY['Thermostats', 'Allegion Locks']) as device,
0 as qty,
company_id as apartment_community_id
From ${raw_iot_Apartment_Community.sql()} d
union all
Select
'Thermostats' as device,
1 as qty,
apartment_community_id
from ${stg_iot_Device_Comm_Failures_Thermostat.sql()} a 
union all
Select
'Allegion Locks' as device,
1 as qty,
apartment_community_id
from ${stg_iot_Device_Comm_Failures_Lock.sql()} a 
`,

    measures: {
      value: {
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
      device: {
        sql: `device`,
        type: `string`,        
        shown: true
        },  
      order:
      {
          sql: `case ${device} when 'Thermostats' then 1
          when 'Allegion Locks' then 2
          end`,
          type: `number`,        
          shown: true,
          primaryKey: true
      },
      color: {
        sql: `case when ${value} > 0 then 'ED441B' else '0CA549' end`,
        type: `string`,        
        shown: true,
        subQuery: true,
      propagateFiltersToSubQuery: true
        },   
      },

      dataSource: `postgres_iot`
    });

