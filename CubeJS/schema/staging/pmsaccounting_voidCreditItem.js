cube(`stg_pmsaccounting_voidCreditItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_voidCreditItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [ledgerId, creditItemId, voidCreditItemId]
    }
  },
  
  dimensions: {
    ledgerId: {
      sql: `${CUBE}."LEDGER_ID"`,
      type: `string`
    },
    
    creditItemId: {
      sql: `${CUBE}."CREDIT_ITEM_ID"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    voidCreditItemId: {
      sql: `${CUBE}."VOID_CREDIT_ITEM_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    note: {
      sql: `${CUBE}."NOTE"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
