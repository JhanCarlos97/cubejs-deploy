cube(`stg_pmsaccounting_userRoles`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_userRoles.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [roleId, customerId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    isDeleted: {
      sql: `${CUBE}."IS_DELETED"`,
      type: `string`
    },
    
    roleId: {
      sql: `${CUBE}."ROLE_ID"`,
      type: `string`
    },
    
    alias: {
      sql: `${CUBE}."ALIAS"`,
      type: `string`
    },
    
    isGlobal: {
      sql: `${CUBE}."IS_GLOBAL"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    isSystemRole: {
      sql: `${CUBE}."IS_SYSTEM_ROLE"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    deletedAt: {
      sql: `${CUBE}."DELETED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
