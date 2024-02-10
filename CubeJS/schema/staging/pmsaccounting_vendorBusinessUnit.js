cube(`stg_pmsaccounting_vendorBusinessUnit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorBusinessUnit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [vendorBusinessUnitId, vendorId, businessUnitId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    vendorBusinessUnitId: {
      sql: `${CUBE}."VENDOR_BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    defaultGlCode: {
      sql: `${CUBE}."DEFAULT_GL_CODE"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
