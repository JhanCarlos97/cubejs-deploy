cube(`stg_pmsaccounting_aclConfigs`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_aclConfigs.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [roleId, communityId, customerUserId, aclConfigId]
    }
  },
  
  dimensions: {
    roleId: {
      sql: `${CUBE}."ROLE_ID"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    customerUserId: {
      sql: `${CUBE}."CUSTOMER_USER_ID"`,
      type: `string`
    },
    
    globalAccess: {
      sql: `${CUBE}."GLOBAL_ACCESS"`,
      type: `string`
    },
    
    aclConfigId: {
      sql: `${CUBE}."ACL_CONFIG_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
