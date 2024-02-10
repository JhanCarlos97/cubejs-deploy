cube(`stg_pmsleasing_leaseValuesInEffect`, {
  sql: `SELECT * FROM ${raw_pmsleasing_leaseValuesInEffect.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [occupancyId, businessUnitId, customerId, leaseExpirationDate, leaseStartDate]
    }
  },
  
  dimensions: {
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
    
    rentAmount: {
      sql: `${CUBE}."RENT_AMOUNT"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    leaseExpirationDate: {
      sql: `${CUBE}."LEASE_EXPIRATION_DATE"`,
      type: `time`
    },
    
    leaseStartDate: {
      sql: `${CUBE}."LEASE_START_DATE"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
