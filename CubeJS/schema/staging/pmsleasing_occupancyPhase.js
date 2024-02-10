cube(`stg_pmsleasing_occupancyPhase`, {
  sql: `SELECT * FROM ${raw_pmsleasing_occupancyPhase.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
    raw_pmsauth_communities: {
      sql: `${stg_pmsleasing_occupancyPhase.businessUnitId} = ${raw_pmsauth_communities}.id`,
      relationship: `hasMany`
    },

  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [reservationId, renewalId, rentalSeriesId, businessUnitId, customerId, initiatingDocumentContentId, occupancyId, initiatingDocumentDisplayName, currentLeaseStartDate, currentLeaseExpirationDate]
    }
  },
  
  dimensions: {
    reservationId: {
      sql: `${CUBE}."RESERVATION_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    effectiveLateFeeDaily: {
      sql: `${CUBE}."EFFECTIVE_LATE_FEE_DAILY"`,
      type: `string`
    },
    
    occupancyPhaseType: {
      sql: `${CUBE}."OCCUPANCY_PHASE_TYPE"`,
      type: `string`
    },
    
    renewalId: {
      sql: `${CUBE}."RENEWAL_ID"`,
      type: `string`
    },
    
    marketRentRateAtStart: {
      sql: `${CUBE}."MARKET_RENT_RATE_AT_START"`,
      type: `string`
    },
    
    rentalSeriesId: {
      sql: `${CUBE}."RENTAL_SERIES_ID"`,
      type: `string`
    },
    
    totalAmenityAmountAtStart: {
      sql: `${CUBE}."TOTAL_AMENITY_AMOUNT_AT_START"`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },

    occupancyPhaseIndex: {
      sql: `${CUBE}."OCCCUPANCY_PHASE_INDEX"`,
      type: `string`
    },
    
    effectivePetRentAmount: {
      sql: `${CUBE}."EFFECTIVE_PET_RENT_AMOUNT"`,
      type: `string`
    },
    
    currentRentAmount: {
      sql: `${CUBE}."CURRENT_RENT_AMOUNT"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    initiatingDocumentContentId: {
      sql: `${CUBE}."INITIATING_DOCUMENT_CONTENT_ID"`,
      type: `string`
    },
    
    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,
      type: `string`
    },
    
    initiatingDocumentDisplayName: {
      sql: `${CUBE}."INITIATING_DOCUMENT_DISPLAY_NAME"`,
      type: `string`
    },
    
    occupancyPhaseSpan: {
      sql: `${CUBE}."OCCUPANCY_PHASE_SPAN"`,
      type: `string`
    },
    
    effectiveLateFeeInitial: {
      sql: `${CUBE}."EFFECTIVE_LATE_FEE_INITIAL"`,
      type: `string`
    },
    
    baseMarketRentRateAtStart: {
      sql: `${CUBE}."BASE_MARKET_RENT_RATE_AT_START"`,
      type: `string`
    },
    
    currentLeaseStartDate: {
      sql: `${CUBE}."CURRENT_LEASE_START_DATE"`,
      type: `time`
    },
    
    currentLeaseExpirationDate: {
      sql: `${CUBE}."CURRENT_LEASE_EXPIRATION_DATE"`,
      type: `time`
    },

    lowerSpan: {
      sql: `convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_SPAN_LOWER"))`,
      type: `time`
    },

    upperSpan: {
      sql: `case when SUBSTRING(${CUBE}."OCCUPANCY_PHASE_SPAN", -1) = ')' 
        then dateadd(d, -1, convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_SPAN_UPPER"))) 
        else convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_SPAN_UPPER")) end`,
        type: `time`
      }
      
  },
  
  dataSource: `snowflake_pms`
});
