cube(`stg_pmsaccounting_lateFeeSchema`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_lateFeeSchema.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, createdBy, communityId, lateFeeSchemaId, updatedBy, createdAt, updatedAt, schemaEndDate, schemaStartDate]
    }
  },
  
  dimensions: {
    dailyChargeCode: {
      sql: `${CUBE}."DAILY_CHARGE_CODE"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    percentCap: {
      sql: `${CUBE}."PERCENT_CAP"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    roundToWhole: {
      sql: `${CUBE}."ROUND_TO_WHOLE"`,
      type: `string`
    },
    
    percentCapType: {
      sql: `${CUBE}."PERCENT_CAP_TYPE"`,
      type: `string`
    },
    
    initialAmount: {
      sql: `${CUBE}."INITIAL_AMOUNT"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    initialChargeCode: {
      sql: `${CUBE}."INITIAL_CHARGE_CODE"`,
      type: `string`
    },
    
    minAppliedBalance: {
      sql: `${CUBE}."MIN_APPLIED_BALANCE"`,
      type: `string`
    },
    
    dailyAmountType: {
      sql: `${CUBE}."DAILY_AMOUNT_TYPE"`,
      type: `string`
    },
    
    lateFeeSchemaId: {
      sql: `${CUBE}."LATE_FEE_SCHEMA_ID"`,
      type: `string`
    },
    
    dailyAmount: {
      sql: `${CUBE}."DAILY_AMOUNT"`,
      type: `string`
    },
    
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    amountCap: {
      sql: `${CUBE}."AMOUNT_CAP"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    initialAmountType: {
      sql: `${CUBE}."INITIAL_AMOUNT_TYPE"`,
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
    },
    
    schemaEndDate: {
      sql: `${CUBE}."SCHEMA_END_DATE"`,
      type: `time`
    },
    
    schemaStartDate: {
      sql: `${CUBE}."SCHEMA_START_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
