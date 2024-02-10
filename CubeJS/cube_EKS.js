const queueOptions = {
  concurrency: 10,
  continueWaitTimeout: 600000
};

const PostgresDriver = require('@cubejs-backend/postgres-driver');
const SnowflakeDriver = require('@cubejs-backend/snowflake-driver');

module.exports = {
  orchestratorOptions: {
    queryCacheOptions: {
      queueOptions,
    }
  },
  dbType: ({ dataSource } = {}) => {
    if (dataSource === 'postgres_iot') {
      return 'postgres';
    } else if (dataSource === 'snowflake_vendor_source' ||  dataSource === 'snowflake_pms' || dataSource === 'snowflake_iot' ||  dataSource === 'snowflake_ga' || dataSource === 'default') {
      return 'snowflake';
    } else {
      return 'postgres';
    }
  },
  driverFactory: ({ dataSource } = {}) => {
    if (dataSource === 'snowflake_vendor_source') {
      return new SnowflakeDriver({
        account: process.env.vendor_source_SNOWFLAKE_ONLY_ACCOUNT,
        region: process.env.vendor_source_SNOWFLAKE_ONLY_REGION,
        username: process.env.CUBE_SNOWFLAKE_USER,
        warehouse: process.env.vendor_source_SNOWFLAKE_WAREHOUSE,
        database: process.env.vendor_source_SNOWFLAKE_DATABASE,
        role: process.env.vendor_source_SNOWFLAKE_ROLE,
        authenticator: 'SNOWFLAKE_JWT',
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
      });
    } else if (dataSource === 'postgres_iot') {
      return new PostgresDriver({
        database: process.env.IOT_POSTGRES_DATABASE,
        host: process.env.IOT_POSTGRES_HOST,
        user: process.env.IOT_POSTGRES_USERNAME,
        password: process.env.IOT_POSTGRES_PASSWORD,
        port: process.env.IOT_POSTGRES_PORT,
        schema: process.env.IOT_POSTGRES_SCHEMA,
      });
    } else if (dataSource === 'snowflake_pms') {
      return new SnowflakeDriver({
        account: process.env.PMS_SNOWFLAKE_ACCOUNT,
        region: process.env.PMS_SNOWFLAKE_REGION,
        username: process.env.CUBE_SNOWFLAKE_USER,
        warehouse: process.env.PMS_SNOWFLAKE_WAREHOUSE,
        database: process.env.PMS_SNOWFLAKE_DATABASE,
        role: process.env.PMS_SNOWFLAKE_ROLE,
        authenticator: 'SNOWFLAKE_JWT',
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
      });
    } else if (dataSource === 'snowflake_iot' || dataSource === 'default') {
      return new SnowflakeDriver({
        account: process.env.IOT_SNOWFLAKE_ACCOUNT,
        region: process.env.IOT_SNOWFLAKE_REGION,
        username: process.env.CUBE_SNOWFLAKE_USER,
        warehouse: process.env.IOT_SNOWFLAKE_WAREHOUSE,
        database: process.env.IOT_SNOWFLAKE_DATABASE,
        schema: process.env.IOT_SNOWFLAKE_SCHEMA,
        role: process.env.IOT_SNOWFLAKE_ROLE,
        authenticator: 'SNOWFLAKE_JWT',
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
      });
    } else if (dataSource === 'snowflake_ga') {
      return new SnowflakeDriver({
        account: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_ACCOUNT,
        region: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_REGION,
        username: process.env.CUBE_SNOWFLAKE_USER,
        warehouse: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_WAREHOUSE,
        database: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_DATABASE,
        schema: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_SCHEMA,
        role: process.env.GOOGLE_ANALYTICS_SNOWFLAKE_ROLE,
        authenticator: 'SNOWFLAKE_JWT',
        privateKeyPath: process.env.PRIVATE_KEY_PATH,
      });
    }
  },
};
