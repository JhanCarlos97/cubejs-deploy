cube(`stg_pmsaccounting_reconciliationItemBankStatementItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_reconciliationItemBankStatementItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [bankStatementItemId, bindId]
    }
  },
  
  dimensions: {
    bankStatementItemId: {
      sql: `${CUBE}."BANK_STATEMENT_ITEM_ID"`,
      type: `string`
    },
    
    bindId: {
      sql: `${CUBE}."BIND_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
