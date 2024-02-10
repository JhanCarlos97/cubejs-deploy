cube(`stg_pmscorecontact_entities`, {
  sql: `SELECT * FROM ${raw_pmscorecontact_entityScopeAlias.sql()}`,
  
  joins: {
    raw_pmscorecontact_entityAddress: {
      sql: `${stg_pmscorecontact_entities}."ENTITY_ID" = ${raw_pmscorecontact_entityAddress}."ENTITY_ID"`,
      relationship: `belongsTo`
    },

    raw_pmscorecontact_entityEmail: {
      sql: `${stg_pmscorecontact_entities}."ENTITY_ID" = ${raw_pmscorecontact_entityEmail}."ENTITY_ID"`,
      relationship: `belongsTo`
    },

    raw_pmscorecontact_entityPhone: {
      sql: `${stg_pmscorecontact_entities}."ENTITY_ID" = ${raw_pmscorecontact_entityPhone}."ENTITY_ID"`,
      relationship: `belongsTo`
    }
  }, 
  
  dimensions: {
    partyId: {
      sql: `${CUBE}."ENTITY_ID"`,                   
      type: `string`,
      primaryKey: true
    },

    businessUnitId: {
      sql: `${CUBE}."SCOPE_ID"`,                   
      type: `string`,
      primaryKey: true
    },
    
    emailAddress: {
      sql: `${raw_pmscorecontact_entityEmail.emailAddress}`,
      type: `string`
    },
    
    phoneNumber: {
      sql: `${raw_pmscorecontact_entityPhone.phoneNumber}`,
      type: `string`
    },
    
    workNumber: {
      sql: `${raw_pmscorecontact_entityPhone.workNumber}`,
      type: `string`
    },   
    
    contactPreference: {
      sql: `${raw_pmscorecontact_entityPhone.contactPreference}`,
      type: `string`
    },  
    
  },
  
  dataSource: `snowflake_pms`
});
