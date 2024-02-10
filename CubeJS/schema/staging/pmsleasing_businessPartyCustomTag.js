cube(`stg_pmsleasing_businessPartyCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_businessPartyCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, businessUnitId, customTagName]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customTagIconUri: {
      sql: `${CUBE}."CUSTOM_TAG_ICON_URI"`,
      type: `string`
    },
    
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
