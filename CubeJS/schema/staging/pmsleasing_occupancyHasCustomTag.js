cube(`stg_pmsleasing_occupancyHasCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyHasCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [occupancyId, customerId, businessUnitId, customTagName]
    }
  },
  
  dimensions: {
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
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
    
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
