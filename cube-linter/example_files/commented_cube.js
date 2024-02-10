//Cube comment
//cubing

cube(`Occupancy Test`, {
    sql: `SELECT * FROM "leasing".occupancy`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },
    
    joins: {
      Unit: {
        sql: `${Occupancy.unitId} = ${Unit.unitId}`,
        relationship: `belongsTo`
      },
  
      CALGrouped: {
        sql: `${Occupancy.unitId} = ${CALGrouped.locationId}`,
        relationship: `belongsTo`
      },
  
      VacateNotice: {
        sql: `${Occupancy.occupancyId} = ${VacateNotice.occupancyId} AND ${VacateNotice.canceledDate} IS NULL`,
        relationship: `belongsTo`
      },
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [occupancyId, customerId, businessUnitId, unitId, endDate, householdMoveInDate, householdMoveOutDate, startDate]
      }
    },
    
    dimensions: {
      occupancyId: {
        sql: `occupancy_id`,
        type: `string`,
        primaryKey: true
      },
      
      currentStatus: {
        sql: `current_status`,
        type: `string`
      },
      
      customerId: {
        sql: `customer_id`,
        type: `string`
      },
      
      businessUnitId: {
        sql: `business_unit_id`,
        type: `string`
      },
      
      unitId: {
        sql: `unit_id`,
        type: `string`
      },
      
      endDate: {
        sql: `end_date`,
        type: `time`
      },
      
      householdMoveInDate: {
        sql: `household_move_in_date`,
        type: `time`
      },
      
      householdMoveOutDate: {
        sql: `household_move_out_date`,
        type: `time`
      },
      
      startDate: {
        sql: `start_date`,
        type: `time`
      }
    },
    
    dataSource: `default`
  });  