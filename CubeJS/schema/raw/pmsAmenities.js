const { PMSAMNT_SCHEMA } = require('../config_schema.js');
cube(`raw_pmsamnt_commAmntLocations`, {   sql: `SELECT * FROM "${PMSAMNT_SCHEMA}"."COMMUNITY_AMENITIES_LOCATIONS"`, dataSource: `snowflake_pms`});
cube(`raw_pmsamnt_commAmnt`, {   sql: `SELECT * FROM "${PMSAMNT_SCHEMA}"."COMMUNITY_AMENITIES"`, dataSource: `snowflake_pms`});
cube(`raw_pmsamnt_Amnt`, {   sql: `SELECT * FROM "${PMSAMNT_SCHEMA}"."AMENITIES"`, dataSource: `snowflake_pms`});