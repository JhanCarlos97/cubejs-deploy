cube(`stg_pms_profiles`,{
sql: `${raw_pmsri_profiles.sql()}`,

joins: {
    raw_pmsri_persons: {
      sql: `${stg_pms_profiles}."PERSON_ID" = ${raw_pmsri_persons.id}`,
      relationship: `belongsTo`
      },

    raw_pmscorecontact_entityPhone: {
    sql: `${stg_pms_profiles}."PARTY_ID" = ${raw_pmscorecontact_entityPhone}."ENTITY_ID"`,
    relationship: `belongsTo`
      },  

    raw_pmsleasing_vehicle: {
    sql: `${stg_pms_profiles}."PARTY_ID" = ${raw_pmsleasing_vehicle}."PRIMARY_DRIVER_PARTY_ID"`,
    relationship: `belongsTo`
        },    

},
dimensions: {
    id: {
        sql: `${CUBE}."ID"`,
        type: `string`,
    },

    communityId: {
        sql: `${CUBE}."COMMUNITY_ID"`,
        type: `string`,
    },

    unitName: {
        sql: `${CUBE}."UNIT_NAME"`,
        type: `string`,
    },

    residents: {
        sql: `${raw_pmsri_persons.residents}`,
        type: `string`,
    },

    phoneNumber: {
        sql: `${raw_pmscorecontact_entityPhone.phoneNumber}`,
        type: `string`,
    },

    vehicleMakeModel: {
        sql: `${raw_pmsleasing_vehicle.vehicleMake} || ' ' || ${raw_pmsleasing_vehicle.vehicleModel}`,
        type: `string`,
    },

    vehicleColor: {
        sql: `${raw_pmsleasing_vehicle.vehicleColor}`,
        type: `string`,
    },

    licensePlate: {
        sql: `${raw_pmsleasing_vehicle.licensePlate}`,
        type: `string`,
    },

    licensePlateRegion: {
        sql: `${raw_pmsleasing_vehicle.licensePlateRegion}`,
        type: `string`,
    },

},

segments: {
    profilesSegment: {
        sql: `${raw_pmsri_persons.id} IS NOT NULL`
    },
},
    
dataSource: `snowflake_pms`}
);