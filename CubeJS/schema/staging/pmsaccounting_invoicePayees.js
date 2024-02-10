cube(`stg_pmsaccounting_invoicePayees`, {
    sql: `SELECT * FROM ${raw_pmsaccounting_invoicePayees.sql()}`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },
    
    joins: {
        raw_pmsaccounting_vendor: {
            sql: `${stg_pmsaccounting_invoicePayees}."VENDOR_ID" = ${raw_pmsaccounting_vendor}."VENDOR_ID"`,
            relationship: `belongsTo`
        },    
    },

    measures: {
        count: {
        type: `count`,
        drillMembers: [payeeId, residentId]
        }
    },
    
    dimensions: {

        payeeId: {
            sql: `${CUBE}."PAYEE_ID"`,
            type: `string`,
            primaryKey: true,
            },

        vendorId: {
            sql: `${CUBE}."VENDOR_ID"`,
            type: `string`
            },

        residentId: {
            sql: `${CUBE}."RESIDENT_ID"`,
            type: `string`
            },
        
        vendorName: {
            sql: `${raw_pmsaccounting_vendor.vendorName}`,
            type: `string`
        },
    },
    
    dataSource: `snowflake_pms`
  });
  