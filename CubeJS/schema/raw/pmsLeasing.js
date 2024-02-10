const { PMSLEASING_SCHEMA } = require('../config_schema.js');
cube(`raw_pmsleasing_occupancy`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY"`, dataSource: `snowflake_pms`});
cube(`raw_pmsleasing_leaseValuesInEffect`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."LEASE_VALUES_IN_EFFECT"`});
cube(`raw_pmsleasing_noticeOfNonRenewal`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."NOTICE_OF_NON_RENEWAL"`});
cube(`raw_pmsleasing_transaction`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."TRANSACTION"`});
cube(`raw_pmsleasing_customerActive`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."CUSTOMER_ACTIVE"`});
cube(`raw_pmsleasing_customer`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."CUSTOMER"`});
cube(`raw_pmsleasing_adminCustomerRoleModifiesPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_CUSTOMER_ROLE_MODIFIES_PERMISSION"`});
cube(`raw_pmsleasing_transactions`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."TRANSACTIONS"`});
cube(`raw_pmsleasing_customerSummary`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."CUSTOMER_SUMMARY"`});
cube(`raw_pmsleasing_adminUser`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_USER"`});
cube(`raw_pmsleasing_pet`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PET"`});
cube(`raw_pmsleasing_permissionToEnter`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PERMISSION_TO_ENTER"`});
cube(`raw_pmsleasing_partyCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PARTY_CUSTOM_TAG"`});
cube(`raw_pmsleasing_occupancyCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_CUSTOM_TAG"`});
cube(`raw_pmsleasing_renewalOffer`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENEWAL_OFFER"`});
cube(`raw_pmsleasing_occupancyStatus`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_STATUS"`});
cube(`raw_pmsleasing_admincompanyUser`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_company_USER"`});
cube(`raw_pmsleasing_nonRenewalReason`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."NON_RENEWAL_REASON"`});
cube(`raw_pmsleasing_unit`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."UNIT"`,
dimensions: {
    cUnitName: {
        sql: `C_UNIT_NAME`,
        type: `string`,
    },

    unitId: {
        sql: `UNIT_ID`,
        type: `string`,
    },


},
dataSource: `snowflake_pms`});
cube(`raw_pmsleasing_vacateReason`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."VACATE_REASON"`});
cube(`raw_pmsleasing_searchableOccupancyParty`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."SEARCHABLE_OCCUPANCY_PARTY"`});
cube(`raw_pmsleasing_occupancyHasCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_HAS_CUSTOM_TAG"`});
cube(`raw_pmsleasing_currentOccupancyParty`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."CURRENT_OCCUPANCY_PARTY"`});
cube(`raw_pmsleasing_businessPartyCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."BUSINESS_PARTY_CUSTOM_TAG"`});
cube(`raw_pmsleasing_renewalOfferLetter`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENEWAL_OFFER_LETTER"`});
cube(`raw_pmsleasing_relationshipPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RELATIONSHIP_PERMISSION"`});
cube(`raw_pmsleasing_party`, {   sql: `SELECT *, concat(c_given_name,' ', c_family_name) AS FULLNAME FROM "${PMSLEASING_SCHEMA}"."PARTY"`,

dimensions: {
    fullName: {
        sql: `FULLNAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms`});
cube(`raw_pmsleasing_userHasCustomRoleAtCommunity`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."USER_HAS_CUSTOM_ROLE_AT_COMMUNITY"`});
cube(`raw_pmsleasing_rentalInsurance`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENTAL_INSURANCE"`});
cube(`raw_pmsleasing_partyAssociation`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PARTY_ASSOCIATION"`});
cube(`raw_pmsleasing_renewal`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENEWAL"`});
cube(`raw_pmsleasing_relationshipTypeHasPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RELATIONSHIP_TYPE_HAS_PERMISSION"`});
cube(`raw_pmsleasing_adminPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_PERMISSION"`});
cube(`raw_pmsleasing_customTagIcon`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."CUSTOM_TAG_ICON"`});
cube(`raw_pmsleasing_vacateNotice`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."VACATE_NOTICE"`});
cube(`raw_pmsleasing_admincompanyRole`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_company_ROLE"`});
cube(`raw_pmsleasing_adminPermissionGroup`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_PERMISSION_GROUP"`});
cube(`raw_pmsleasing_partyHasCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PARTY_HAS_CUSTOM_TAG"`});
cube(`raw_pmsleasing_adminBaseRole`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_BASE_ROLE"`});
cube(`raw_pmsleasing_adminCustomerUserHasRoleForCustomerGlobally`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_CUSTOMER_USER_HAS_ROLE_FOR_CUSTOMER_GLOBALLY"`});
cube(`raw_pmsleasing_adminBaseRoleHasPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_BASE_ROLE_HAS_PERMISSION"`});
cube(`raw_pmsleasing_occupancyRelationshipType`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_RELATIONSHIP_TYPE"`});
cube(`raw_pmsleasing_rentalInsurancePolicyType`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENTAL_INSURANCE_POLICY_TYPE"`});
cube(`raw_pmsleasing_adminCustomerRole`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_CUSTOMER_ROLE"`});
cube(`raw_pmsleasing_admincompanyRoleHasPermission`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_company_ROLE_HAS_PERMISSION"`});
cube(`raw_pmsleasing_occupancyRelationship`, {   sql: `
SELECT 
    CASE 
        WHEN valid_span != 'empty' 
        THEN TO_TIMESTAMP_NTZ(REPLACE(REGEXP_SUBSTR(valid_span, '"([^"]+)"', 1, 1), '"', '')) 
        ELSE NULL
    END AS SUBS_VALID_SPAN_LOWER,
    CASE 
        WHEN valid_span != 'empty' AND SUBSTRING(valid_span, - 2) != ',' 
        THEN TO_TIMESTAMP_NTZ(REPLACE(REGEXP_SUBSTR(valid_span, '"([^"]+)"', 1, 2), '"', ''))
        ELSE NULL
    END AS SUBS_VALID_SPAN_UPPER, * 
FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_RELATIONSHIP"` , dataSource: `snowflake_pms`});
cube(`raw_pmsleasing_businessUnit`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."BUSINESS_UNIT"`});
cube(`raw_pmsleasing_rentalInsurancyPolicyStatus`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."RENTAL_INSURANCY_POLICY_STATUS"`});
cube(`raw_pmsleasing_adminCustomerUser`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_CUSTOMER_USER"`});
cube(`raw_pmsleasing_partyPartyCustomTag`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."PARTY_PARTY_CUSTOM_TAG"`});
cube(`raw_pmsleasing_occupancyPhase`, {   sql: `SELECT 
CASE 
    WHEN occupancy_phase_span != 'empty' 
    THEN TO_TIMESTAMP_NTZ(REPLACE(REGEXP_SUBSTR(occupancy_phase_span, '"([^"]+)"', 1, 1), '"', '')) 
    ELSE NULL
END AS SUBS_SPAN_LOWER,
CASE 
    WHEN occupancy_phase_span != 'empty' AND SUBSTRING(occupancy_phase_span, - 2) != ',' 
    THEN TO_TIMESTAMP_NTZ(REPLACE(REGEXP_SUBSTR(occupancy_phase_span, '"([^"]+)"', 1, 2), '"', ''))
    ELSE NULL
END AS SUBS_SPAN_UPPER, *
FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_PHASE"`, dataSource: `snowflake_pms`});
cube(`raw_pmsleasing_occupancyPhaseType`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."OCCUPANCY_PHASE_TYPE"`});
cube(`raw_pmsleasing_ntvReceivedFromParty`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."NTV_RECEIVED_FROM_PARTY"`});
cube(`raw_pmsleasing_admincompanyUserHascompanyRole`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."ADMIN_company_USER_HAS_company_ROLE"`});
cube(`raw_pmsleasing_vehicle`, {   sql: `SELECT * FROM "${PMSLEASING_SCHEMA}"."VEHICLE"`,
dimensions: {
    vehicleMake: {
        sql: `VEHICLE_MAKE`,
        type: `string`,
    },

    vehicleModel: {
        sql: `VEHICLE_MODEL`,
        type: `string`,
    },

    vehicleColor: {
        sql: `VEHICLE_COLOR`,
        type: `string`,
    },

    licensePlate: {
        sql: `VEHICLE_LICENSE_PLATE_TEXT`,
        type: `string`,
    },

    licensePlateRegion: {
        sql: `LICENSE_PLATE_REGION`,
        type: `string`,
    },
},
dataSource: `snowflake_pms`
});