cube(`stg_pmsleasing_occupancy`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancy.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    raw_pmsleasing_unit: {
        sql: `${stg_pmsleasing_occupancy.unitId} = ${raw_pmsleasing_unit}."UNIT_ID"`,
        relationship: `belongsTo`}, 
    
    },  

  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, businessUnitId, occupancyId, unitId, endDate, householdMoveOutDate, householdMoveInDate, startDate]
    }
  },
  
  dimensions: {

    unitName: {
      sql: `${raw_pmsleasing_unit.cUnitName}`,
      type: `string`
    },

    currentStatus: {
      sql: `${CUBE}."CURRENT_STATUS"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    unitId: {
      sql: `${CUBE}."UNIT_ID"`,
      type: `string`
    },
    
    endDate: {
      sql: `${CUBE}."END_DATE"`,
      type: `time`
    },
    
    householdMoveOutDate: {
      sql: `${CUBE}."HOUSEHOLD_MOVE_OUT_DATE"`,
      type: `time`
    },
    
    householdMoveInDate: {
      sql: `${CUBE}."HOUSEHOLD_MOVE_IN_DATE"`,
      type: `time`
    },
    
    startDate: {
      sql: `${CUBE}."START_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
