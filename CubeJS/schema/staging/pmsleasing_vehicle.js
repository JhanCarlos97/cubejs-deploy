cube(`stg_pmsleasing_vehicle`, {
  sql: `SELECT * FROM ${raw_pmsleasing_vehicle.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [licensePlateCountry, businessUnitId, vehicleId, customerId, primaryDriverPartyId]
    }
  },
  
  dimensions: {
    licensePlateCountry: {
      sql: `${CUBE}."LICENSE_PLATE_COUNTRY"`,
      type: `string`
    },
    
    vehicleLicensePlateText: {
      sql: `${CUBE}."VEHICLE_LICENSE_PLATE_TEXT"`,
      type: `string`
    },
    
    vehicleMake: {
      sql: `${CUBE}."VEHICLE_MAKE"`,
      type: `string`
    },
    
    licensePlateRegion: {
      sql: `${CUBE}."LICENSE_PLATE_REGION"`,
      type: `string`
    },
    
    vehicleModel: {
      sql: `${CUBE}."VEHICLE_MODEL"`,
      type: `string`
    },
    
    vehicleType: {
      sql: `${CUBE}."VEHICLE_TYPE"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    vehicleId: {
      sql: `${CUBE}."VEHICLE_ID"`,
      type: `string`
    },
    
    vehicleColor: {
      sql: `${CUBE}."VEHICLE_COLOR"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    primaryDriverPartyId: {
      sql: `${CUBE}."PRIMARY_DRIVER_PARTY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
