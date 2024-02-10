cube(`stg_pmsaccounting_billItem`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_billItem.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },


  joins: {

    stg_pmsaccounting_bill: {
        sql: `${stg_pmsaccounting_bill.billId} = ${stg_pmsaccounting_billItem.billId}`,
        relationship: `hasOne`
    },
    
  },
  
  measures: {
    billSum: {
      sql: `${stg_pmsaccounting_billItem.amount}`,
      type: `sum`
    }
  },
  
  dimensions: {
    ledgerId: {
      sql: `${CUBE}."LEDGER_ID"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    billItemId: {
      sql: `${CUBE}."BILL_ITEM_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    billId: {
      sql: `${CUBE}."BILL_ID"`,
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
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
