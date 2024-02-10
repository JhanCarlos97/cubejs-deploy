cube(`stg_pmsaccounting_communityManagementAgents`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_communityManagementAgents.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [name, id, communityId]
    }
  },
  
  dimensions: {
    email: {
      sql: `${CUBE}."EMAIL"`,
      type: `string`
    },
    
    role: {
      sql: `${CUBE}."ROLE"`,
      type: `string`
    },
    
    isAgent: {
      sql: `${CUBE}."IS_AGENT"`,
      type: `string`
    },
    
    phone: {
      sql: `${CUBE}."PHONE"`,
      type: `string`
    },
    
    name: {
      sql: `${CUBE}."NAME"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `string`,
      primaryKey: true
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
