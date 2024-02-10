cube(`stg_pmsaccounting_chartOfAccountBalance`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_chartOfAccountBalance.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [chartAccountId, businessUnitId]
    }
  },
  
  dimensions: {
    chartAccountId: {
      sql: `${CUBE}."CHART_ACCOUNT_ID"`,
      type: `string`
    },
    
    closingBalance: {
      sql: `${CUBE}."CLOSING_BALANCE"`,
      type: `string`
    },
    
    currentBalance: {
      sql: `${CUBE}."CURRENT_BALANCE"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    startingBalance: {
      sql: `${CUBE}."STARTING_BALANCE"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
