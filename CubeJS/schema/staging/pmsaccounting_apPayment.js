cube(`stg_pmsaccounting_apPayment`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_apPayment.sql()}`,
  
  joins: {

    raw_pmsaccounting_communities: {
      sql: `${stg_pmsaccounting_apPayment}."BUSINESS_UNIT_ID" = ${raw_pmsaccounting_communities}."COMMUNITY_ID"`,
      relationship: `belongsTo`},    

      raw_pmsaccounting_bankAccounts: {
      sql: `${stg_pmsaccounting_apPayment}."BANK_ACCOUNT_ID" = ${raw_pmsaccounting_bankAccounts}."ID"`,
      relationship: `belongsTo`},    
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, customerId, createdBy, updatedBy, creditId, apPaymentId, createdDate, updatedDate]
    }
  },
  
  dimensions: {

    community: {
      sql: `${raw_pmsaccounting_communities.community}`,                
      type: `string`,
      title: `Community`,
      meta: {
        styleType: 'textLeft',
        show: true,
        size: 324,
        sortable: true
        }            
      },  

    bankAccountId: {
      sql: `${CUBE}."BANK_ACCOUNT_ID"`,
      type: "string"
    },

    bankName: {
      sql: `${raw_pmsaccounting_bankAccounts.bankName}`,   
      type: "string"
    },
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: "number"
    },
    method: {
      sql: `${CUBE}."METHOD"`,
      type: "string"
    },
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: "string"
    },
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: "string"
    },
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: "string"
    },
    creditId: {
      sql: `${CUBE}."CREDIT_ID"`,
      type: "string"
    },
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: "string"
    },
    apPaymentId: {
      sql: `${CUBE}."AP_PAYMENT_ID"`,
      type: "string",
      primaryKey: true
    },
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: "time"
    },
    updatedDate: {
      sql: `${CUBE}."UPDATED_DATE"`,
      type: "time"
    },
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: "string"
    },
    status: {
      sql: `${CUBE}."STATUS"`,
      type: "string"
    }
  },
  
  dataSource: `snowflake_pms`
});
