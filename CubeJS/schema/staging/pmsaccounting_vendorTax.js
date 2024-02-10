cube(`stg_pmsaccounting_vendorTax`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_vendorTax.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [taxId, vendorTaxId, vendorId, createdAt, updatedAt]
    }
  },
  
  dimensions: {
    isEmployee: {
      sql: `${CUBE}."IS_EMPLOYEE"`,
      type: `string`
    },
    
    ssn: {
      sql: `${CUBE}."SSN"`,
      type: `string`
    },
    
    taxId: {
      sql: `${CUBE}."TAX_ID"`,
      type: `string`
    },
    
    vendorTaxId: {
      sql: `${CUBE}."VENDOR_TAX_ID"`,
      type: `string`
    },
    
    taxType: {
      sql: `${CUBE}."TAX_TYPE"`,
      type: `string`
    },
    
    vendorId: {
      sql: `${CUBE}."VENDOR_ID"`,
      type: `string`
    },
    
    federalTaxClassification: {
      sql: `${CUBE}."FEDERAL_TAX_CLASSIFICATION"`,
      type: `string`
    },
    
    requires1099: {
      sql: `${CUBE}."REQUIRES_1099"`,
      type: `string`,
      title: `Requires 1099`
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
