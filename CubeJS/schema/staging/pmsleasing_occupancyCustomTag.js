cube(`stg_pmsleasing_occupancyCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, customTagName, businessUnitId]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
