cube(`stg_pmsaccounting_reconciliation`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_reconciliation.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [reconciliationId, updatedBy, businessUnitId, customerId, bankAccountId, createdBy, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    reconciliationId: {
      sql: `${CUBE}."RECONCILIATION_ID"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
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
    
    balance: {
      sql: `${CUBE}."BALANCE"`,
      type: `string`
    },
    
    bankAccountId: {
      sql: `${CUBE}."BANK_ACCOUNT_ID"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    completedAt: {
      sql: `${CUBE}."COMPLETED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
