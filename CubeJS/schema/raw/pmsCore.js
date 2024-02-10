const { PMSCORE_SCHEMA } = require('../config_schema.js');
cube(`raw_pmscore_space`, {   sql: `SELECT * FROM "${PMSCORE_SCHEMA}"."SPACE"`, dataSource: `snowflake_pms`});