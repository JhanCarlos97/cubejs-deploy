cube(`stg_pmsleasing_noticeOfNonRenewal`, {
  sql: `SELECT * FROM ${raw_pmsleasing_noticeOfNonRenewal.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, businessUnitId, vacateNoticeId]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    reasonForNotRenewing: {
      sql: `${CUBE}."REASON_FOR_NOT_RENEWING"`,
      type: `string`
    },
    
    vacateNoticeId: {
      sql: `${CUBE}."VACATE_NOTICE_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
