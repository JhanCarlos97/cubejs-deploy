cube(`stg_pmsaccounting_ledgerEntry`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_ledgerEntry.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    stg_pmsaccounting_bankAccounts: {
      sql: `${stg_pmsaccounting_ledgerEntry.debitGl} = ${stg_pmsaccounting_bankAccounts.chartAccountId}`,
      relationship: `belongsTo`
    },
      
  },

  measures: {
    prepaidAmount: {
      sql: `COALESCE(${stg_pmsaccounting_ledgerEntry.amount}, 0)`,
      type: `sum`
    }
  },
  
  dimensions: {

    bankId: {
      sql: `${stg_pmsaccounting_bankAccounts.id}`,
      type: `string`
    },

    bankName: {
      sql: `${stg_pmsaccounting_bankAccounts.bankName}`,
      type: `string`
    },

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    ledgerEntryId: {
      sql: `${CUBE}."LEDGER_ENTRY_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    pairId: {
      sql: `${CUBE}."PAIR_ID"`,
      type: `string`
    },
    
    debitAccount: {
      sql: `${CUBE}."DEBIT_ACCOUNT"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    creditGl: {
      sql: `${CUBE}."CREDIT_GL"`,
      type: `string`,
      primaryKey: true
    },
    
    creditAccount: {
      sql: `${CUBE}."CREDIT_ACCOUNT"`,
      type: `string`,
      primaryKey: true
    },
    
    debitGl: {
      sql: `${CUBE}."DEBIT_GL"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    postDate: {
      sql: `${CUBE}."POST_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
