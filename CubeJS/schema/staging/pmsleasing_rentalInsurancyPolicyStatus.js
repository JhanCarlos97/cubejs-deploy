cube(`stg_pmsleasing_rentalInsurancyPolicyStatus`, {
  sql: `SELECT * FROM ${raw_pmsleasing_rentalInsurancyPolicyStatus.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [rentalInsurancePolicyStatusName]
    }
  },
  
  dimensions: {
    rentalInsurancePolicyStatusName: {
      sql: `${CUBE}."RENTAL_INSURANCE_POLICY_STATUS_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
