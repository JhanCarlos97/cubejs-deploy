cube(`stg_pmsaccounting_deposit`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_deposit.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  
  joins: {

    stg_pmsaccounting_credit: {
      sql: `${stg_pmsaccounting_deposit.creditId} = ${stg_pmsaccounting_credit.creditId}`,
      relationship: `belongsTo`
    },
      
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, depositId, updatedBy, creditId, createdBy, createdAt, updatedAt]
    }
  },
  
  dimensions: {

    voidCreditId: {
      sql: `${stg_pmsaccounting_credit.voidCreditId}`,
      type: `string`
    },

    bankId: {
      sql: `${stg_pmsaccounting_credit.bankId}`,
      type: `string`
    },

    bankName: {
      sql: `${stg_pmsaccounting_credit.bankName}`,
      type: `string`
    },

    batchId: {
      sql: `${CUBE}."BATCH_ID"`,
      type: `string`
    },

    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    depositId: {
      sql: `${CUBE}."DEPOSIT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    reference: {
      sql: `${CUBE}."REFERENCE"`,
      type: `string`
    },
    
    note: {
      sql: `${CUBE}."NOTE"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    creditId: {
      sql: `${CUBE}."CREDIT_ID"`,
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
    
    deletedAt: {
      sql: `${CUBE}."DELETED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
