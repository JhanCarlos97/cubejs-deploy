const { PMSCBR_SCHEMA } = require('../config_schema.js');
cube(`raw_pmscbr_unitSpecsInfo`, {   sql: `SELECT * FROM "${PMSCBR_SCHEMA}"."UNIT_SPECS_INFO"`, dataSource: `snowflake_pms`});
cube(`raw_pmscbr_unitTypes`, {   sql: `SELECT * FROM "${PMSCBR_SCHEMA}"."UNIT_TYPES" WHERE DELETED_AT is null`, dataSource: `snowflake_pms`});
cube(`raw_pmscbr_unitStatus`, {   sql: `SELECT * FROM "${PMSCBR_SCHEMA}"."UNIT_STATUS" WHERE DELETED_AT is null`, dataSource: `snowflake_pms`});