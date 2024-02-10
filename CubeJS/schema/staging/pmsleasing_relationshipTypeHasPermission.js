cube(`stg_pmsleasing_relationshipTypeHasPermission`, {
  sql: `SELECT * FROM ${raw_pmsleasing_relationshipTypeHasPermission.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, relationshipPermissionName, relationshipTypeName, customerId]
    }
  },
  
  dimensions: {
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    relationshipPermissionName: {
      sql: `${CUBE}."RELATIONSHIP_PERMISSION_NAME"`,
      type: `string`
    },
    
    relationshipTypeName: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
