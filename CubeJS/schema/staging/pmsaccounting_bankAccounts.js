cube(`stg_pmsaccounting_bankAccounts`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_bankAccounts.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, communityId, id, createdBy, accountName, chartAccountId, bankName, city, updatedBy, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `string`,
      primaryKey: true
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    accountNumber: {
      sql: `${CUBE}."ACCOUNT_NUMBER"`,
      type: `string`
    },
    
    accountName: {
      sql: `${CUBE}."ACCOUNT_NAME"`,
      type: `string`
    },
    
    secondAddress: {
      sql: `${CUBE}."SECOND_ADDRESS"`,
      type: `string`
    },
    
    chartAccountId: {
      sql: `${CUBE}."CHART_ACCOUNT_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    outstandingBalance: {
      sql: `${CUBE}."OUTSTANDING_BALANCE"`,
      type: `string`
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    isActive: {
      sql: `${CUBE}."IS_ACTIVE"`,
      type: `string`
    },
    
    bankName: {
      sql: `${CUBE}."BANK_NAME"`,
      type: `string`
    },
    
    postalZip: {
      sql: `${CUBE}."POSTAL_ZIP"`,
      type: `string`
    },
    
    firstAddress: {
      sql: `${CUBE}."FIRST_ADDRESS"`,
      type: `string`
    },
    
    city: {
      sql: `${CUBE}."CITY"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
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
