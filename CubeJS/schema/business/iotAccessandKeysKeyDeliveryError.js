cube(`bus_iot_Access_and_Keys_Key_Delivery_Error`, {
    sql: `

    select 0 as count, company_id as apartment_community_id from ${raw_iot_Apartment_Community.sql()} b
union all
  Select
     *    
  from ${stg_iot_Access_and_Keys_Key_Delivery_Error.sql()} a 
  `,

    measures: {       
      count: {
        sql: `sum(count)`,
        type: `number`,        
        shown: true,
        title: 'Key Delivery Error'
      },   
    }, 
    
   dimensions: {


      communityId: {
        sql: `apartment_community_id`,
        type: `string`,        
        shown: true
      },
    },

      dataSource: `postgres_iot`
    });

