cube(`stg_pmsaccounting_reconciliationItemLedgerEntry`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_reconciliationItemLedgerEntry.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [bindId, ledgerEntryId]
    }
  },
  
  dimensions: {
    bindId: {
      sql: `${CUBE}."BIND_ID"`,
      type: `string`
    },
    
    ledgerEntryId: {
      sql: `${CUBE}."LEDGER_ENTRY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
