cube(`stg_pmsaccounting_periodBalanceAccount`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_periodBalanceAccount.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, customerId, id, accountId, createdAt, closeDate]
    }
  },
  
  dimensions: {
    creditAmount: {
      sql: `${CUBE}."CREDIT_AMOUNT"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    billAmount: {
      sql: `${CUBE}."BILL_AMOUNT"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    accountId: {
      sql: `${CUBE}."ACCOUNT_ID"`,
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
