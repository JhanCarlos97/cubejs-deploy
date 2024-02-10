// cube(`stg_al_party`, {
//     extends: raw_udm_party,
    
//     joins: {

//         stg_al_persons: {
//             sql: `${CUBE.contactId} = ${stg_al_persons.personsId}`,
//             relationship: `belongsTo`
//         },

//     },
    
//     preAggregations: {
//       // Pre-Aggregations definitions go here
//       // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
//     },
    
//     dimensions: {

//         partyId: {
//             sql: `${CUBE}."PARTY_ID"`,
//             type: `string`,
//             primaryKey: true,
//             shown: true
//         },

//         businessUnitId: {
//             sql: `${CUBE}."BUSINESS_UNIT_ID"`,
//             type: `string`,
//             shown: true
//         },

//         contactId: {
//             sql: `${CUBE}."CONTACT_ID"`,
//             type: `string`,
//             shown: true
//         },

//         customerId: {
//             sql: `${CUBE}."CUSTOMER_ID"`,
//             type: `string`,
//             shown: true
//         },

//         fullName: {
//             sql: `${stg_al_persons.fullName}`,
//             type: `string`,
//             shown: true
//         },

//         applicationDate: {
//             sql: `${CUBE}."PARTY_APPLICATION_DATE"`,
//             type: `string`,
//             shown: true
//         },

//         moveInDate: {
//             sql: `${CUBE}."PARTY_MOVE_IN_DATE"`,
//             type: `string`,
//             shown: true
//         },

//         moveOutDate: {
//             sql: `${CUBE}."PARTY_MOVE_OUT_DATE"`,
//             type: `string`,
//             shown: true
//         },

//     },
    
//     dataSource: `snowflake_pms`

// });
  