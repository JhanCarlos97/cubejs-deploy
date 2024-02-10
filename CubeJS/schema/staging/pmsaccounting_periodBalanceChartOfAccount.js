cube(`stg_pmsaccounting_periodBalanceChartOfAccount`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_periodBalanceChartOfAccount.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, customerId, id, chartOfAccountId, createdAt, closeDate]
    }
  },
  
  dimensions: {
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    chartOfAccountId: {
      sql: `${CUBE}."CHART_OF_ACCOUNT_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    closeDate: {
      sql: `${CUBE}."CLOSE_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
