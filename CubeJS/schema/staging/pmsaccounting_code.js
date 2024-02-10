cube(`stg_pmsaccounting_code`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_code.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    raw_pmsaccounting_codeCategory: {
      sql: `${stg_pmsaccounting_code}."CODE_CATEGORY_ID" = ${raw_pmsaccounting_codeCategory}."ID"`,
      relationship: `belongsTo`
    },         
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, updatedBy, createdBy, id, communityId, name, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    deletedBy: {
      sql: `${CUBE}."DELETED_BY"`,
      type: `string`
    },
    
    amount: {
      sql: `${CUBE}."AMOUNT"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    updatedBy: {
      sql: `${CUBE}."UPDATED_BY"`,
      type: `string`
    },
    
    createdBy: {
      sql: `${CUBE}."CREATED_BY"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    isEligible: {
      sql: `${CUBE}."IS_ELIGIBLE"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },
    
    name: {
      sql: `${CUBE}."NAME"`,
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

    codeCategoryName: {
      sql: `${raw_pmsaccounting_codeCategory.codeCategoryName}`,
      type: `string`
    },

    isRehabItem: {
      sql: `CASE WHEN UPPER(${CUBE.codeCategoryName}) like 'REHAB%' then true else false end`,
      type: `boolean`
    }
  },
  
  dataSource: `snowflake_pms`
});
