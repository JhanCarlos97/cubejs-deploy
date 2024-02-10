cube(`raw_web_hostnameMapping`, {
    sql: `SELECT * FROM "vendor_name"."HOSTNAME_MAPPING"`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },
    
    joins: {
      
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [communityName, hostname, communityId]
      }
    },
    
    dimensions: {
      communityName: {
        sql: `${CUBE}."COMMUNITY_NAME"`,
        type: `string`
      },
      
      hostname: {
        sql: `${CUBE}."HOSTNAME"`,
        type: `string`,
        primaryKey: true
      },
      
      communityId: {
        sql: `${CUBE}."COMMUNITY_ID"`,
        type: `string`
      }
    },
    
    dataSource: `snowflake_ga`
  });
  