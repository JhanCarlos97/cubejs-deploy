cube(`bus_pms_unitOccupancy`, {
    sql: `WITH occupancy_cte as (
      SELECT occupancy.business_unit_id
        ,occupancy.occupancy_id	
        ,occupancy.household_move_in_date
        ,occupancy.start_date
        ,occupancy_relationship.SUBS_VALID_SPAN_LOWER AS lower_span
        ,occupancy_relationship.SUBS_VALID_SPAN_UPPER AS upper_span
        ,occupancy.household_move_out_date
        ,coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date	
        ,occupancy.unit_id      
      FROM ${raw_pmsleasing_occupancy.sql()} AS occupancy         
      INNER JOIN ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase ON occupancy_phase.occupancy_id = occupancy.occupancy_id    
      INNER JOIN ${raw_pmsleasing_occupancyRelationship.sql()} occupancy_relationship ON occupancy_relationship.occupancy_id = occupancy.occupancy_id
      INNER join ${raw_pmsauth_communities.sql()} as c on occupancy.business_unit_id = c.id
      where (${FILTER_PARAMS.bus_pms_unitOccupancy.businessUnitId.filter((value) => `occupancy.BUSINESS_UNIT_ID = ${value}`)})
          and ${FILTER_PARAMS.bus_pms_unitOccupancy.dateAsOf.filter((value) => 
            `convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_LOWER)) <= ${value}`)}
          and case when SUBSTRING(occupancy_relationship.valid_span, -1) = ')' 
              then dateadd(d, -1, convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_UPPER))) 
              else ${FILTER_PARAMS.bus_pms_unitOccupancy.dateAsOf.filter((value) => 
                  `convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_UPPER)) end >= ${value}`)} 
          and occupancy_relationship.relationship_type_name ='Resident'          
                  )
                  

      Select 
      ${FILTER_PARAMS.bus_pms_unitOccupancy.dateAsOf.filter((value) => `${value}`)} as DATE,
          oc.business_unit_id,
          UT.NAME as UNIT_TYPE,
             to_char(BEDROOM_NUM) || '/' || to_char(BATHROOM_NUM) as BED_BATH,
             SI.SQUARE_FOOTAGE,
             A.NAME AMENITY_GROUP,
             COUNT(1) as UNIT_COUNT,
             SUM(CASE WHEN OC.household_move_out_date is not null then 1 else 0
                 END )  as VACANT_COUNT,
             ((COUNT(1) - ( SUM(CASE WHEN OC.household_move_out_date is not null then 1 else 0 END ))) / (COUNT(1) )) * 100 AS OCCUPANY_PERCENTAGE       
      from occupancy_cte OC
      left join ${raw_pmscbr_unitSpecsInfo.sql()} si on si.unit_id = oc.unit_id and si.building_id is not null
      left join ${raw_pmscbr_unitTypes.sql()} ut on si.unit_type_id = ut.id and UT.DELETED_AT is null
      left join ${raw_pmsamnt_commAmnt.sql()} CA ON UT.COMMUNITY_ID = CA.COMMUNITY_ID      
      left join ${raw_pmsleasing_unit.sql()} U on CA.COMMUNITY_ID = U.BUSINESS_UNIT_ID AND SI.UNIT_ID = U.UNIT_ID
      left join ${raw_pmsamnt_Amnt.sql()} A on A.ID = CA.AMENITY_ID  
      GROUP BY 1, 2, 3, 4, 5, 6`, 
   
    dimensions: {

      dateAsOf: {
        sql: `${CUBE}."DATE"`,                
        type: `string`
      },

      businessUnitId: {
        sql: ` ${CUBE}."BUSINESS_UNIT_ID"`,                 
        type: `string`,
        title: `Business Unit Id`
      },

      unitType: {
        sql: ` ${CUBE}."UNIT_TYPE"`,                 
        type: `string`,
        title: `Unit`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        },
      },

      bedBath: {
          sql: `${CUBE}."BED_BATH"`,                 
          type: `string`,
          title: `Bed/bath`,
          meta: {
            styleType: 'string',
            show: true,
            size: 135,
            sortable: true
          }  
      },
     
      sqFeet: {
        sql: ` ${CUBE}."SQUARE_FOOTAGE"`,                 
        type: `string`,
        title: `Sq. Ft.`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }  
    },

    amenityGroup: {
      sql: ` ${CUBE}."AMENITY_GROUP"`,                 
      type: `string`,
      title: `Amenity group`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }  
  },
 
  unitCount: {
    sql: ` ${CUBE}."UNIT_COUNT"`,                 
    type: `string`,
    title: `Unit count`,
    meta: {
      styleType: 'string',
      show: true,
      size: 135,
      sortable: true
    }  
  },

  vacantCount: {
    sql: ` ${CUBE}."VACANT_COUNT"`,                 
    type: `string`,
    title: `Vacant count`,
    meta: {
      styleType: 'string',
      show: true,
      size: 135,
      sortable: true
    }  
  },

  occupancyPercentage: {
    sql: ` ROUND(${CUBE}."OCCUPANY_PERCENTAGE",0)`,                 
    type: `string`,
    title: `Occupancy percentage`,
    meta: {
      styleType: 'string',
      show: true,
      size: 135,
      sortable: true
    }  
  },
}, 

    dataSource: `snowflake_pms`
});
