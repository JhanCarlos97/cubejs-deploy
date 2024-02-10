cube(`stg_pms_glParentChild`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_glAccount.sql()} gl_child`,  
   
  joins: {

    raw_pmsaccounting_glAccount: {
      sql: `${stg_pms_glParentChild}."PARENT_ID" = ${raw_pmsaccounting_glAccount}."GL_ACCOUNT_ID"
             AND ${stg_pms_glParentChild}."PARENT_ID" is not null`,
      relationship: `belongsTo`
    },
    
    raw_pmsaccounting_glAccountType: {
      sql: `${stg_pms_glParentChild}."GL_TYPE" = ${raw_pmsaccounting_glAccountType}."ID"`,
      relationship: `belongsTo`
    }     
    
  },

  dimensions: {

    glParentId: {
      sql: `${stg_pms_glParentChild}."PARENT_ID"`,
      type: `string`,
      primaryKey: true
    },

    glChildId: {
      sql: `${CUBE}."GL_ACCOUNT_ID"`,
      type: `string`,
      primaryKey: true
    },

    glParentName: {
      sql: `${raw_pmsaccounting_glAccount.glName}`,
      type: `string`
    },

    glChildName: {
      sql: `${CUBE}."GL_NAME"`,
      type: `string`
    }, 
    
    glChildNumber: {
      sql: `${CUBE}."GL_NUMBER"`,
      type: `string`
    },    

    glTypeName: {
      sql: `${raw_pmsaccounting_glAccountType.glTypeName}`,
      type: `string`
    },

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`
    },

  },
  
  dataSource: `snowflake_pms`
});
