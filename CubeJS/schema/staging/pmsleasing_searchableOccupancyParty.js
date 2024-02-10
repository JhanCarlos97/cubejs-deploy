cube(`stg_pmsleasing_searchableOccupancyParty`, {
  sql: `SELECT * FROM ${raw_pmsleasing_searchableOccupancyParty.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [validSpan, cGivenName, contactId, partyId, relationshipTypeName, cFamilyName, customerId, occupancyId, businessUnitId]
    }
  },
  
  dimensions: {
    validSpan: {
      sql: `${CUBE}."VALID_SPAN"`,
      type: `string`
    },
    
    cGivenName: {
      sql: `${CUBE}."C_GIVEN_NAME"`,
      type: `string`
    },
    
    contactId: {
      sql: `${CUBE}."CONTACT_ID"`,
      type: `string`
    },
    
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,
      type: `string`
    },
    
    relationshipTypeName: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,
      type: `string`
    },
    
    cFamilyName: {
      sql: `${CUBE}."C_FAMILY_NAME"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    }
  },
  
  dataSource: `snowflake_pms`
});
