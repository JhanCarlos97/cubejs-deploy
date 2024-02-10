cube(`stg_pmsaccounting_charge`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_charge.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [createdBy, updatedBy, bindId, accountId, chargeId, billItemId, createdAt, updatedAt, dueDate, postDate]
    }
  },
  
  dimensions: {
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    reference: {
      sql: `${CUBE}."REFERENCE"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    bindId: {
      sql: `${CUBE}."BIND_ID"`,
      type: `string`
    },
    
    accountId: {
      sql: `${CUBE}."ACCOUNT_ID"`,
      type: `string`
    },
    
    chargeId: {
      sql: `${CUBE}."CHARGE_ID"`,
      type: `string`
    },
    
    billItemId: {
      sql: `${CUBE}."BILL_ITEM_ID"`,
      type: `string`
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
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
    
    dueDate: {
      sql: `${CUBE}."DUE_DATE"`,
      type: `time`
    },
    
    deletedAt: {
      sql: `${CUBE}."DELETED_AT"`,
      type: `time`
    },
    
    postDate: {
      sql: `${CUBE}."POST_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
