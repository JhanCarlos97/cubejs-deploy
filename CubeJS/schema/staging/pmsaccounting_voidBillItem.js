cube(`stg_pmsaccounting_voidBillItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_voidBillItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [billItemId, voidBillItemId, ledgerEntryId]
    }
  },
  
  dimensions: {
    billItemId: {
      sql: `${CUBE}."BILL_ITEM_ID"`,
      type: `string`
    },
    
    voidBillItemId: {
      sql: `${CUBE}."VOID_BILL_ITEM_ID"`,
      type: `string`
    },
    
    ledgerEntryId: {
      sql: `${CUBE}."LEDGER_ENTRY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
