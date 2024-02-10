cube(`stg_pmsaccounting_creditItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_creditItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [creditItemId, customerId, ledgerId, creditId, businessUnitId, billId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    isConcession: {
      sql: `${CUBE}."IS_CONCESSION"`,
      type: `string`
    },
    
    creditItemId: {
      sql: `${CUBE}."CREDIT_ITEM_ID"`,
      type: `string`
    },
    
    isCredit: {
      sql: `${CUBE}."IS_CREDIT"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    ledgerId: {
      sql: `${CUBE}."LEDGER_ID"`,
      type: `string`
    },
    
    creditId: {
      sql: `${CUBE}."CREDIT_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    billId: {
      sql: `${CUBE}."BILL_ID"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
