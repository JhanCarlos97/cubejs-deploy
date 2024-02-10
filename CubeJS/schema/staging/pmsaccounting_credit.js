cube(`stg_pmsaccounting_credit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_credit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    stg_pmsaccounting_ledgerEntry: {
      sql: `${stg_pmsaccounting_credit.ledgerId} = ${stg_pmsaccounting_ledgerEntry.ledgerEntryId}`,
      relationship: `belongsTo`
    },

    stg_pmsaccounting_voidCredit: {
      sql: `${stg_pmsaccounting_credit.creditId} = ${stg_pmsaccounting_voidCredit.creditId}`,
      relationship: `belongsTo`
    },
      
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, ledgerId, customerId, creditId, createdDate, updatedDate]
    }
  },
  
  dimensions: {

    voidCreditId: {
      sql: `${stg_pmsaccounting_voidCredit.voidCreditId}`,
      type: `string`
    },

    bankId: {
      sql: `${stg_pmsaccounting_ledgerEntry.bankId}`,
      type: `string`
    },

    bankName: {
      sql: `${stg_pmsaccounting_ledgerEntry.bankName}`,
      type: `string`
    },

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    ledgerId: {
      sql: `${CUBE}."LEDGER_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    creditId: {
      sql: `${CUBE}."CREDIT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
