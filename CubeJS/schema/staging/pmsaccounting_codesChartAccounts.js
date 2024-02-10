cube(`stg_pmsaccounting_codesChartAccounts`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_codesChartAccounts.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },

  joins: {

    stg_pmsaccounting_code: {
      sql: `${stg_pmsaccounting_codesChartAccounts.codeId} = ${stg_pmsaccounting_code.id}`,
      relationship: `belongsTo`
    },         
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, chartAccountId]
    }
  },
  
  dimensions: {
    isWriteOffCode: {
      sql: `${CUBE}."IS_WRITE_OFF_CODE"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    },
    
    isCredit: {
      sql: `${CUBE}."IS_CREDIT"`,
      type: `string`
    },
    
    isConcession: {
      sql: `${CUBE}."IS_CONCESSION"`,
      type: `string`
    },
    
    chartAccountId: {
      sql: `${CUBE}."CHART_ACCOUNT_ID"`,
      type: `string`
    },

    codeId: {
      sql: `${CUBE}."CODE_ID"`,
      type: `string`
    },

    isRehabItem: {
      sql: `${stg_pmsaccounting_code.isRehabItem}`,
      type: `boolean`
    }

  },
  
  dataSource: `snowflake_pms`
});
