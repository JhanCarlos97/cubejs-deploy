cube(`stg_pmsleasing_partyPartyCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_partyPartyCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [partyId, customTagName, businessUnitId, customerId]
    }
  },
  
  dimensions: {
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    },
    
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    customTagIconUri: {
      sql: `${CUBE}."CUSTOM_TAG_ICON_URI"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
