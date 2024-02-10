cube(`stg_pmsaccounting_nsfSetting`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_nsfSetting.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, isRestoringCheckByResidency, businessUnitId, id, createdAt, updatedAt]
    },
    
    restoringCheckAfterMonthCount: {
      sql: `${CUBE}."RESTORING_CHECK_AFTER_MONTH_COUNT"`,
      type: `sum`
    },
    
    revokingCreditCardOrCertifiedPaymentCount: {
      sql: `${CUBE}."REVOKING_CREDIT_CARD_OR_CERTIFIED_PAYMENT_COUNT"`,
      type: `sum`
    },
    
    revokingCertifiedPaymentCount: {
      sql: `${CUBE}."REVOKING_CERTIFIED_PAYMENT_COUNT"`,
      type: `sum`
    },
    
    revokingCreditCardOrPayOfficePaymentCount: {
      sql: `${CUBE}."REVOKING_CREDIT_CARD_OR_PAY_OFFICE_PAYMENT_COUNT"`,
      type: `sum`
    }
  },
  
  dimensions: {
    isRevokingCreditCardOrCertified: {
      sql: `${CUBE}."IS_REVOKING_CREDIT_CARD_OR_CERTIFIED"`,
      type: `string`
    },
    
    isRevokingCertified: {
      sql: `${CUBE}."IS_REVOKING_CERTIFIED"`,
      type: `string`
    },
    
    isRestoringCheckByMonths: {
      sql: `${CUBE}."IS_RESTORING_CHECK_BY_MONTHS"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    isRestoringCheckByResidency: {
      sql: `${CUBE}."IS_RESTORING_CHECK_BY_RESIDENCY"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    isRevokingCreditCardOrPayOffice: {
      sql: `${CUBE}."IS_REVOKING_CREDIT_CARD_OR_PAY_OFFICE"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    isRestoringCheckByLease: {
      sql: `${CUBE}."IS_RESTORING_CHECK_BY_LEASE"`,
      type: `string`
    },
    
    isRestriction: {
      sql: `${CUBE}."IS_RESTRICTION"`,
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
