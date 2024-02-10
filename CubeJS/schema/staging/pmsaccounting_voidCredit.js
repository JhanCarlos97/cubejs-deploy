cube(`stg_pmsaccounting_voidCredit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_voidCredit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [creditId, voidCreditId, ledgerId]
    }
  },
  
  dimensions: {
    creditId: {
      sql: `${CUBE}."CREDIT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    voidCreditId: {
      sql: `${CUBE}."VOID_CREDIT_ID"`,
      type: `string`
    },
    
    ledgerId: {
      sql: `${CUBE}."LEDGER_ID"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
