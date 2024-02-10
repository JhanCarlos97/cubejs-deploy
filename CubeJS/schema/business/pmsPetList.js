cube(`bus_pmsPetList`, {
    sql: `${raw_pmsleasing_pet.sql()}`,

    joins: {
      bus_pms_residentList: {
        sql: `${bus_pmsPetList}."PET_OWNER_PARTY_ID" = ${bus_pms_residentList}."PARTY_ID"`,
        relationship: `belongsTo`
        }  
      },
   
    dimensions: {
      unit: {
        sql: ` ${bus_pms_residentList.unit}`,                 
        type: `string`,
        title: `Unit`,
        meta: {
          styleType: 'string',
          show: false,
          size: 135,
          sortable: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          isGroupIdentifier: true
        }
      }, 
     
      resident: {
        sql: `${bus_pms_residentList.resident}`,                 
        type: `string`,
        title: `Resident`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      }, 

      email: {
        sql: `${bus_pms_residentList.email}`,                 
        type: `string`,
        title: `Email`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },   

      phone: {
        sql: `${bus_pms_residentList.phone}`,                 
        type: `string`,
        title: `Phone`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },   

      petCategory: {
        sql: `${CUBE}."PET_SPECIES"`,                 
        type: `string`,
        title: `Pet Category`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },

      petTypeBreed: {
        sql: `${CUBE}."PET_BREED"`,                 
        type: `string`,
        title: `Pet type/breed`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
    },

    petName: {
      sql: `${CUBE}."PET_NAME"`,                 
      type: `string`,
      title: `Pet name`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }
    
     },

     businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,                 
      type: `string`,      
      title: `Business Unit Id`,
      meta: {        
        show: false,        
      }
     },

     petPartyId: {
      sql: `${CUBE}."PET_OWNER_PARTY_ID"`,                 
      type: `string`,
      primaryKey: true,   
      title: `Customer Id`,
      meta: {        
        show: false,        
      }
     }
}, 

    dataSource: `snowflake_pms`
});
