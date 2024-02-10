cube(`stg_pmsleasing_partyHasCustomTag`, {
  sql: `SELECT * FROM ${raw_pmsleasing_partyHasCustomTag.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [communityId, partyId, customTagName, customerId]
    }
  },
  
  dimensions: {
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    },
    
    customTagName: {
      sql: `${CUBE}."CUSTOM_TAG_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
