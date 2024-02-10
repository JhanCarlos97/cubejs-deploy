cube(`stg_pmsaccounting_bankStatementItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_bankStatementItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [bankStatementItemId, reconciliationId, postDate]
    }
  },
  
  dimensions: {
    bankStatementItemId: {
      sql: `${CUBE}."BANK_STATEMENT_ITEM_ID"`,
      type: `string`
    },
    
    reconciliationId: {
      sql: `${CUBE}."RECONCILIATION_ID"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    isDebit: {
      sql: `${CUBE}."IS_DEBIT"`,
      type: `string`
    },
    
    balance: {
      sql: `${CUBE}."BALANCE"`,
      type: `string`
    },
    
    postDate: {
      sql: `${CUBE}."POST_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
