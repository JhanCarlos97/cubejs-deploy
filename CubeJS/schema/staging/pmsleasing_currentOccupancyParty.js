cube(`stg_pmsleasing_currentOccupancyParty`, {
  sql: `SELECT * FROM ${raw_pmsleasing_currentOccupancyParty.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cGivenName, cFamilyName, relationshipTypeName, customerId, validSpan, businessUnitId, contactId, occupancyId, partyId]
    }
  },
  
  dimensions: {
    cGivenName: {
      sql: `${CUBE}."C_GIVEN_NAME"`,
      type: `string`
    },
    
    cFamilyName: {
      sql: `${CUBE}."C_FAMILY_NAME"`,
      type: `string`
    },
    
    relationshipTypeName: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    validSpan: {
      sql: `${CUBE}."VALID_SPAN"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },
    
    contactId: {
      sql: `${CUBE}."CONTACT_ID"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
