cube(`stg_pmsaccounting_businessUnit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_businessUnit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [unitName, customerId, businessUnitId]
    }
  },
  
  dimensions: {
    unitName: {
      sql: `${CUBE}."UNIT_NAME"`,
      type: `string`
    },
    
    type: {
      sql: `${CUBE}."TYPE"`,
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
