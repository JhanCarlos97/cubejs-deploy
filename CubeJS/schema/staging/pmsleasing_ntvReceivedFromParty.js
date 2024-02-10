cube(`stg_pmsleasing_ntvReceivedFromParty`, {
  sql: `SELECT * FROM ${raw_pmsleasing_ntvReceivedFromParty.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, notifyingPartyId, businessUnitId, vacateNoticeId]
    }
  },
  
  dimensions: {
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    reasonForVacating: {
      sql: `${CUBE}."REASON_FOR_VACATING"`,
      type: `string`
    },
    
    notifyingPartyId: {
      sql: `${CUBE}."NOTIFYING_PARTY_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    vacateNoticeId: {
      sql: `${CUBE}."VACATE_NOTICE_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
