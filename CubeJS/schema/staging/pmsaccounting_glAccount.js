cube(`stg_pmsaccounting_glAccount`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_glAccount.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    stg_pmsaccounting_codesChartAccounts: {
      sql: `${stg_pmsaccounting_glAccount.glAccountId} = ${stg_pmsaccounting_codesChartAccounts.chartAccountId}`,
      relationship: `belongsTo`
    },         
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [updatedBy, createdBy, parentId, glName, glAccountId, customerId, businessUnitId, createdDate, updatedDate, deletedDate]
    }
  },
  
  dimensions: {
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    canPostTo: {
      sql: `${CUBE}."CAN_POST_TO"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    parentId: {
      sql: `${CUBE}."PARENT_ID"`,
      type: `string`
    },
    
    glName: {
      sql: `${CUBE}."GL_NAME"`,
      type: `string`,
      primaryKey: true
    },
    
    glAccountId: {
      sql: `${CUBE}."GL_ACCOUNT_ID"`,
      type: `string`
    },
    
    glNumber: {
      sql: `${CUBE}."GL_NUMBER"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    },
    
    deletedDate: {
      sql: `${CUBE}."DELETED_DATE"`,
      type: `time`
    },

    isRehabItem: {
      sql: `${stg_pmsaccounting_codesChartAccounts.isRehabItem}`,
      type: `boolean`
    },
  },
  
  dataSource: `snowflake_pms`
});
