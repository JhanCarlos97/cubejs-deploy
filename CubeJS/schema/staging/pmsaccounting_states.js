cube(`stg_pmsaccounting_states`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_states.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [name, id]
    }
  },
  
  dimensions: {
    alias: {
      sql: `${CUBE}."ALIAS"`,
      type: `string`
    },
    
    name: {
      sql: `${CUBE}."NAME"`,
      type: `string`
    },
    
    id: {
      sql: `${CUBE}."ID"`,
      type: `number`,
      primaryKey: true
    }
  },
  
  dataSource: `snowflake_pms`
});
