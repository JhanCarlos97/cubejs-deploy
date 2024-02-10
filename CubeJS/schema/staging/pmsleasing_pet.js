cube(`stg_pmsleasing_pet`, {
  sql: `SELECT * FROM ${raw_pmsleasing_pet.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [businessUnitId, petOwnerPartyId, petId, customerId, petName]
    }
  },
  
  dimensions: {
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    petSex: {
      sql: `${CUBE}."PET_SEX"`,
      type: `string`
    },
    
    petSpecies: {
      sql: `${CUBE}."PET_SPECIES"`,
      type: `string`
    },
    
    petOwnerPartyId: {
      sql: `${CUBE}."PET_OWNER_PARTY_ID"`,
      type: `string`
    },
    
    petId: {
      sql: `${CUBE}."PET_ID"`,
      type: `string`
    },
    
    petBreed: {
      sql: `${CUBE}."PET_BREED"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    petName: {
      sql: `${CUBE}."PET_NAME"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
