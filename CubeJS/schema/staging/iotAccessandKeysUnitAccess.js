cube(`stg_iot_Access_and_Keys_Unit_Access`, {
    sql: `
      SELECT 
      case when sub.role_type in ('CUSTOMER_ADMIN', 'PROPERTY_MANAGER', 'PROPERTY_STAFF', 'MAINTENANCE') then 1 else 2 end as order,
      case when sub.role_type in ('CUSTOMER_ADMIN', 'PROPERTY_MANAGER', 'PROPERTY_STAFF', 'MAINTENANCE') then 'Staff Access' else 'Vendor Access' end as roleType,
      count(*) as total,
      COUNT(CASE WHEN sub.unit_status = 'VACANT' THEN sub.location_id END) AS vacant,
      COUNT(CASE WHEN sub.unit_status = 'OCCUPIED' THEN sub.location_id END) AS occupied,
      apartment_community_id            
      FROM (
           SELECT DISTINCT
               uwr.role_type,
               uwr.user_id,
               l.id as location_id,
               l.unit_status,
               uwr.apartment_community_id               
           FROM ${raw_iot_User_With_Role.sql()} uwr           
                    JOIN ${raw_iot_Customer_User.sql()} cu ON uwr.user_id = cu.user_id                     
                    JOIN ${raw_iot_Customer_User_To_User_Group.sql()} cutug ON cu.id = cutug.customer_user_id                     
                    JOIN ${raw_iot_User_Group_Link.sql()}  ugl ON cutug.user_group_id = ugl.child_user_group_id                    
                    JOIN ${raw_iot_User_Group.sql()} ug ON ugl.parent_user_group_id = ug.id                    
                    JOIN ${raw_iot_User_Access.sql()} ua ON ug.id = ua.user_group_id                     
                    JOIN ${raw_iot_User_Access_To_Location.sql()} uatl ON ua.id = uatl.user_access_id
                    JOIN ${raw_iot_location.sql()} l ON uatl.location_id = l.id
           WHERE l.location_type = 'UNIT'
             AND ua.user_access_status = 'ACTIVE' 
             AND cu.deleted_at IS NULL
             AND CURRENT_TIMESTAMP < ua.time_to
      ) AS sub
      GROUP BY 1,2,6    
      `,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });