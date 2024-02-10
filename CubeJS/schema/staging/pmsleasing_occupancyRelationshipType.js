cube(`stg_pmsleasing_occupancyRelationshipType`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyRelationshipType.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [relationshipTypeName, customerId, businessUnitId]
    }
  },
  
  dimensions: {
    relationshipTypeName: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
