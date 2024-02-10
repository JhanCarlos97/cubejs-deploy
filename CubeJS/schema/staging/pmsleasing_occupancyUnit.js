cube(`stg_pmsleasing_occupancyUnit`, {
    sql: `SELECT * FROM ${raw_pmsleasing_occupancy.sql()}`,
  
    joins: {
      raw_pmsleasing_unit: {
        sql: `${stg_pmsleasing_occupancyUnit}."UNIT_ID" = ${raw_pmsleasing_unit}."UNIT_ID"`,
        relationship: `belongsTo`
      }
    }, 
    
    dimensions: {   
  
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
  
    householdMoveOutDate: {
      sql: `${CUBE}."HOUSEHOLD_MOVE_OUT_DATE"`,
      type: `string`
    },

    moveInDate: {
      sql: `${CUBE}."HOUSEHOLD_MOVE_IN_DATE"`,                
      type: `time`,
      title: `Move in date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 101
      }
    },
  
    cUnitName: {
      sql: `${raw_pmsleasing_unit.cUnitName}`,
      type: `string`
    },
  
  },
    dataSource: `snowflake_pms`
  });
  