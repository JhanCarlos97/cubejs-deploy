cube(`bus_ga_searchConsole`, {
    sql: `SELECT * FROM "GASEARCHCONSOLE"."RAW_GASEARCHCONSOLE"`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },

    joins: {
      raw_web_hostnameMapping: {
        sql: `${raw_web_hostnameMapping.hostname} = ${bus_ga_searchConsole.site}`,
        relationship: `belongsTo`
      },
    },
    
    measures: {

      clicks: {
        sql: `CLICKS`,
        type: `sum`,
        meta: {
          styleType: 'number',
          show: true,
          size: 150,
          sortable: true
      },
      },

      impressions: {
        sql: `IMPRESSIONS`,
        type: `sum`,
        meta: {
          styleType: 'number',
          show: true,
          size: 150,
          sortable: true
      },
      },

      avgCtr: {
        sql: `100*CTR`,
        type: `avg`,
        meta: {
          styleType: 'percent',
          show: true,
          size: 150,
          sortable: true
        }
      },

      avgCtrNoDecimals: {
        type: `number`,
        sql: `round(${CUBE.avgCtr})`,
      },

      avgPosition: {
        sql: `POSITION`,
        type: `avg`
      },

      avgPosition2Decimals: {
        type: `number`,
        sql: `round(${CUBE.avgPosition},2)`,
        meta: {
          styleType: 'integer',
          show: true,
          size: 150,
          sortable: true
      },
      },
    },
  
    dimensions: {

      site: {
        sql: `${CUBE}."SITE"`,
        type: `string`,
        primaryKey: true
      },  

      date: {
        sql: `${CUBE}."DATE"`,
        type: `string`
      },

      dateFormatted: {
        sql: `TO_DATE(${date}, 'YYYY-MM-DD')`,
        type: `time`
      },

      query: {
        sql: `${CUBE}."QUERY"`,
        type: `string`,
        meta: {
          styleType: 'string',
          show: true,
          size: 300,
          sortable: true
      }
      },

    },
  
    dataSource: `snowflake_ga`
    
  });