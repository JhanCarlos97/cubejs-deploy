cube(`stg_pmsaccounting_reconciliationItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_reconciliationItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [reconciliationId, bindId]
    }
  },
  
  dimensions: {
    reconciliationId: {
      sql: `${CUBE}."RECONCILIATION_ID"`,
      type: `string`
    },
    
    bindId: {
      sql: `${CUBE}."BIND_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
