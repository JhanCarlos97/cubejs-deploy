cube(`stg_pmssreq_requests`, {
  sql: `SELECT * FROM ${raw_pmssreq_requests.sql()}`,  
   
  joins: {

    raw_pmssreq_categories: {
      sql: `${stg_pmssreq_requests}."CATEGORY" = ${raw_pmssreq_categories}."ID"`,
      relationship: `belongsTo`
    },         
  },

  dimensions: {

    categoryId: {
      sql: `${CUBE}."CATEGORY"`,
      type: `string`,
      primaryKey: true
    },

    Id: {
      sql: `${raw_pmssreq_categories.id}`,
      type: `string`,
      primaryKey: true
    },

    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`
    },

    locationId: {
      sql: `${CUBE}."LOCATION_ID"`,
      type: `string`
    },

    priority: {
      sql: `${CUBE}."PRIORITY"`,
      type: `string`
    },

    category: {
      sql: `${raw_pmssreq_categories.category}`,
      type: `string`
    },

    status: {
      sql: `${CUBE}."STATE"`,
      type: `string`
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_DATE"`,
      type: `string`
    },
    
    completionDate: {
      sql: `${CUBE}."AUTO_COMPLETED_AT"`,
      type: `string`
    },
    
  },
  
  dataSource: `snowflake_pms`
});
