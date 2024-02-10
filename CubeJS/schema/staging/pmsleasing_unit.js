cube(`stg_pmsleasing_unit`, {
  sql: `SELECT * FROM ${raw_pmsleasing_unit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [unitId, cUnitName, spaceId, customerId, businessUnitId]
    }
  },
  
  dimensions: {
    unitId: {
      sql: `${CUBE}."UNIT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    cUnitName: {
      sql: `${CUBE}."C_UNIT_NAME"`,
      type: `string`
    },
    
    spaceId: {
      sql: `${CUBE}."SPACE_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
