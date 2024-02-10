cube(`stg_pmsaccounting_glAccountSettings`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_glAccountSettings.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pmsaccounting_ledgerEntry: {
      sql: `${stg_pms_accountPrepaidAmount.accountId} = ${stg_pmsaccounting_ledgerEntry.creditAccount} AND
            ${stg_pmsaccounting_glAccountSettings.prepaid} = ${stg_pmsaccounting_ledgerEntry.creditGl}`,
      relationship: `hasOne`
    },

  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [chargeInPrepaid, id, prepaid, businessUnitId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    chargeInPrepaid: {
      sql: `${CUBE}."CHARGE_IN_PREPAID"`,
      type: `string`
    },
    
    operatingDepositMapping: {
      sql: `${CUBE}."OPERATING_DEPOSIT_MAPPING"`,
      type: `string`
    },
    
    accountsPayable: {
      sql: `${CUBE}."ACCOUNTS_PAYABLE"`,
      type: `string`
    },
    
    delinquency: {
      sql: `${CUBE}."DELINQUENCY"`,
      type: `string`
    },
    
    operatingExpenseMapping: {
      sql: `${CUBE}."OPERATING_EXPENSE_MAPPING"`,
      type: `string`
    },
    
    retainedEarnings: {
      sql: `${CUBE}."RETAINED_EARNINGS"`,
      type: `string`
    },
    
    accountsReceivable: {
      sql: `${CUBE}."ACCOUNTS_RECEIVABLE"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    prepaid: {
      sql: `${CUBE}."PREPAID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    vacancy: {
      sql: `${CUBE}."VACANCY"`,
      type: `string`
    },
    
    lossToLease: {
      sql: `${CUBE}."LOSS_TO_LEASE"`,
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
