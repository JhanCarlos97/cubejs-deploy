cube(`stg_pmsleasing_renewalOffer`, {
  sql: `SELECT * FROM ${raw_pmsleasing_renewalOffer.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [renewalUuid]
    }
  },
  
  dimensions: {
    price: {
      sql: `${CUBE}."PRICE"`,
      type: `string`
    },
    
    renewalUuid: {
      sql: `${CUBE}."RENEWAL_UUID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
