cube(`stg_pmsaccounting_communityWorkingHours`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_communityWorkingHours.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [communityId, id]
    }
  },
  
  dimensions: {
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `string`,
      primaryKey: true
    },
    
    open: {
      sql: `${CUBE}."OPEN"`,
      type: `string`
    },
    
    isClosed: {
      sql: `${CUBE}."IS_CLOSED"`,
      type: `string`
    },
    
    close: {
      sql: `${CUBE}."CLOSE"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
