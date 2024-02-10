cube(`stg_pmsaccounting_communityAddresses`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_communityAddresses.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, communityId]
    }
  },
  
  dimensions: {
    state: {
      sql: `${CUBE}."STATE"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `string`,
      primaryKey: true
    },
    
    postalCode: {
      sql: `${CUBE}."POSTAL_CODE"`,
      type: `string`
    },
    
    addressLine2: {
      sql: `${CUBE}."ADDRESS_LINE_2"`,
      type: `string`,
      title: `Address Line 2`
    },
    
    city: {
      sql: `${CUBE}."CITY"`,
      type: `string`
    },
    
    addressLine1: {
      sql: `${CUBE}."ADDRESS_LINE_1"`,
      type: `string`,
      title: `Address Line 1`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    isMailingAddress: {
      sql: `${CUBE}."IS_MAILING_ADDRESS"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
