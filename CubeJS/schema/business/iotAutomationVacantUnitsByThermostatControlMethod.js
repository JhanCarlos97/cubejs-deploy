cube(`bus_iot_Automation_Vacant_Units`, {
  sql: `

  select sum(temporary_mode) as temporary_mode, mode, apartment_community_id from (
  Select   
  0 as temporary_mode,
    unnest(ARRAY['Automatic', 'Manual']) as mode,
    company_id as apartment_community_id
    From ${raw_iot_Apartment_Community.sql()} d
    union all
Select
  count(1) as temporary_mode, mode, apartment_community_id
from ${stg_iot_Automation_Vacant_Units.sql()} a
group by  apartment_community_id, mode) b
group by apartment_community_id, mode
`,

  measures: {
    temporaryMode: {
      type: `sum`,
      sql: `temporary_mode`
      },  
  }, 
 dimensions: {

    communityId: {
      sql: `apartment_community_id`,
      type: `string`,        
      shown: true,
      primaryKey: true
      }, 
      mode: {
        sql: `mode`,
        type: `string`,
        primaryKey: true
      },
  
    },

    dataSource: `postgres_iot`
  });

    
  cube(`bus_iot_Aut_Vacant_Units_by_T_Control_Method`, {
  sql: 
  `Select
  *
    from ${stg_iot_Automation_Vacant_Units_by_Thermostat_Control_Method.sql()} a`,

    joins: {
      bus_iot_Automation_Vacant_Units: {
      relationship: `hasOne`,
      sql: `${CUBE}.apartment_community_id = ${bus_iot_Automation_Vacant_Units}.apartment_community_id
      and ${CUBE}.mode = ${bus_iot_Automation_Vacant_Units}.mode`,
      },
    },

    measures: {
      qty: {
        sql: `Value`,
        type: `sum`,        
        shown: true
        },   
      tempQty: {
          sql: `${bus_iot_Automation_Vacant_Units.temporaryMode}`,
          type: `number`,        
          shown: true
          },   
      prc: {
        sql: `round(coalesce((10000*coalesce(sum(Value),0)/nullif(sum(sum(Value)) over(),0))/100,0),0)`,
        type: `number`,    
        shown: true
        },  
      tempPrc: {
        sql: `case when ${bus_iot_Aut_Vacant_Units_by_T_Control_Method.qty} > 0 then 
              round(100.0 * ${bus_iot_Automation_Vacant_Units.temporaryMode} / ${bus_iot_Aut_Vacant_Units_by_T_Control_Method.qty},0)
              else 0 end`,
        type: `number`,    
        shown: true
        },  
    }, 
   dimensions: {

      communityId: {
        sql: `apartment_community_id`,
        type: `string`,        
        shown: true,
        primaryKey: true
        },        
      
        mode: {
          sql: `mode`,
          type: `string`,        
          shown: true,
          primaryKey: true
          }, 
          order: {
          sql: `order`,
          type: `number`,        
          shown: true
          }, 
  

      },

      dataSource: `postgres_iot`
    },
    );
