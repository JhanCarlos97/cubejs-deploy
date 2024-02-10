cube(`stg_pmsaccounting_glAccountType`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_glAccountType.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [glTypeName, id, createdDate, updatedDate]
    }
  },
  
  dimensions: {
    glAccountNumber: {
      sql: `${CUBE}."GL_ACCOUNT_NUMBER"`,
      type: `string`
    },
    
    glTypeName: {
      sql: `${CUBE}."GL_TYPE_NAME"`,
      type: `string`
    },
    
    isDebit: {
      sql: `${CUBE}."IS_DEBIT"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
