cube(`stg_pmsaccounting_bill`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_bill.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

      stg_pms_creditItemsSum: {
        sql: `${stg_pms_creditItemsSum.billId} = ${stg_pmsaccounting_bill.billId}`,
        relationship: `hasMany`
    },
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, billId, customerId, createdDate, updatedDate, postDate]
    }
  },
  
  dimensions: {
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    billId: {
      sql: `${CUBE}."BILL_ID"`,
      type: `string`,
      primaryKey: true,
      shown: true
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `time`
    },
    
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: `time`
    },
    
    postDate: {
      sql: `date_trunc('day', ${CUBE}.post_date)`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
