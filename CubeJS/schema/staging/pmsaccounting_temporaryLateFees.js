cube(`stg_pmsaccounting_temporaryLateFees`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_temporaryLateFees.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [lateFeeSchemaId, temporaryLateFeeId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    lateFeeSchemaId: {
      sql: `${CUBE}."LATE_FEE_SCHEMA_ID"`,
      type: `string`
    },
    
    restoringType: {
      sql: `${CUBE}."RESTORING_TYPE"`,
      type: `string`
    },
    
    adjustmentType: {
      sql: `${CUBE}."ADJUSTMENT_TYPE"`,
      type: `string`
    },
    
    temporaryLateFeeId: {
      sql: `${CUBE}."TEMPORARY_LATE_FEE_ID"`,
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
