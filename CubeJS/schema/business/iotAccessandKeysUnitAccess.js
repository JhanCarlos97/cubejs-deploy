cube(`bus_iot_Access_and_Keys_Unit_Access`, {
  sql: `
  Select   
  unnest(ARRAY['Staff Access', 'Vendor Access']) as roleType,
  0 as total,
  0 as vacant,
  0 as occupied,
  company_id as apartment_community_id
  From ${raw_iot_Apartment_Community.sql()} b
union all
Select
   roleType, total, vacant, occupied, apartment_community_id
from ${stg_iot_Access_and_Keys_Unit_Access.sql()} a 
`,

  measures: {       
    total: {
      sql: `sum(total)`,
      type: `number`,        
      shown: true
    },  

    vacant: {
      sql: `sum(vacant)`,
      type: `number`,        
      shown: true
    },

    occupied: {
      sql: `sum(occupied)`,
      type: `number`,        
      shown: true
    },     
  }, 
  
 dimensions: {
  order:
  {
      sql: `case ${roleType} when 'Staff Access' then 1
      when 'Vendor Access' then 2
      end`,
      type: `number`,        
      shown: true,
      primaryKey: true
  },
  
  roleType: {
      sql: `roleType`,
      type: `string`,        
      shown: true
    },  

 

    communityId: {
      sql: `apartment_community_id`,
      type: `string`,        
      shown: true
    },
  },

    dataSource: `postgres_iot`
  });

