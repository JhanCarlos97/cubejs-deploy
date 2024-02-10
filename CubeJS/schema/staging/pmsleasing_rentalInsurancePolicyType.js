cube(`stg_pmsleasing_rentalInsurancePolicyType`, {
  sql: `SELECT * FROM ${raw_pmsleasing_rentalInsurancePolicyType.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [rentalInsurancePolicyTypeName]
    }
  },
  
  dimensions: {
    rentalInsurancePolicyTypeName: {
      sql: `${CUBE}."RENTAL_INSURANCE_POLICY_TYPE_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
