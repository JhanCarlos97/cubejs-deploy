cube(`bus_pms_residentList`, {
  sql: `${raw_pmsleasing_occupancyRelationship.sql()}`,
  
  joins: {
    raw_pmsleasing_party: {
      sql: `${bus_pms_residentList}."PARTY_ID" = ${raw_pmsleasing_party}."PARTY_ID"`,
      relationship: `belongsTo`
      },

    raw_pmsauth_communities: {
      sql: `${bus_pms_residentList}."BUSINESS_UNIT_ID" = ${raw_pmsauth_communities}."ID"`,
      relationship: `belongsTo`
      },

    stg_pmsleasing_occupancyUnit: {    
      sql: `${bus_pms_residentList}."OCCUPANCY_ID" = ${stg_pmsleasing_occupancyUnit}."OCCUPANCY_ID"`,
      relationship: `belongsTo`
      }, 
      
    stg_pmsleasing_rentalInsurance: {    
        sql: `${bus_pms_residentList}."PARTY_ID" = ${stg_pmsleasing_rentalInsurance}."PARTY_ID"`,
        relationship: `belongsTo`
      }, 

    stg_pmscorecontact_entities: {    
          sql: `${bus_pms_residentList}."PARTY_ID" = ${stg_pmscorecontact_entities.partyId}
                and ${bus_pms_residentList}."BUSINESS_UNIT_ID" =  ${stg_pmscorecontact_entities.businessUnitId}`,
          relationship: `belongsTo`
      },     

    },

  dimensions: {
    partyId: {
      sql: `${CUBE}."PARTY_ID"`,                 
      type: `string`,
      primaryKey: true,      
      meta: {        
        show: false
      }
    },

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,
      type: `string`,
      meta: {        
        show: false
      }       
      },

    occupancyId: {
      sql: `${stg_pmsleasing_occupancyUnit.occupancyId}`,                 
      type: `string`,
      primaryKey: true,      
      meta: {        
        show: false
      }
    },
    
  residentType: {
      sql: `${CUBE}."RELATIONSHIP_TYPE_NAME"`,                 
      type: `string`,
      title: `Resident type`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true,
        filterPosition: 'key,label'
      }
    },

  resident: {
      sql: ` ${raw_pmsleasing_party.fullName}`,                 
      type: `string`,
      title: `Resident name`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }
    },

    householdMoveOutDate: {
      sql: ` ${stg_pmsleasing_occupancyUnit.householdMoveOutDate}`,                 
      type: `string`,
      title: `Move out date`,
      meta: {       
        show: true
      }
    },  

    moveInDate: {
      sql: ` ${stg_pmsleasing_occupancyUnit.moveInDate}`,                 
      type: `string`,
      title: `Move in date`,
      meta: {       
        show: true
      }
    },  

    unit: {
      sql: ` ${stg_pmsleasing_occupancyUnit.cUnitName}`,                 
      type: `string`,
      title: `Unit`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }
    },
    
    unitPMR60: {
      sql: ` ${stg_pmsleasing_occupancyUnit.cUnitName}`,                 
      type: `string`,
      title: `Unit`,
      meta: {
        styleType: 'string',
        show: false,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true,
        isGroupIdentifier: true
      }
    },

    orLowerSpan: {
      sql: `convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_LOWER"))`,
      type: `time`
    },  

    orUpperSpan: {
      sql: `case when SUBSTRING(${CUBE}."VALID_SPAN", -1) = ')' 
    then dateadd(d, -1, convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_UPPER"))) 
        else convert_timezone('UTC', ${raw_pmsauth_communities.timeZoneId}, TO_TIMESTAMP_NTZ(${CUBE}."SUBS_VALID_SPAN_UPPER")) end`,
        type: `time`
      },


      email: {
        sql: `${stg_pmscorecontact_entities.emailAddress}`,                 
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
        sql: `${stg_pmscorecontact_entities.phoneNumber}`,                 
        type: `string`,
        title: `Phone number`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },  
      
      contactPreference: {
        sql: `${stg_pmscorecontact_entities.contactPreference}`,                 
        type: `string`,
        title: `Contact preference`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },   

      workPhone: {
        sql: `${stg_pmscorecontact_entities.workNumber}`,                 
        type: `string`,
        title: `Work phone`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },

      planType: {
        sql: `${stg_pmsleasing_rentalInsurance.policyType}`,                 
        type: `string`,
        title: `Plan type`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },   

      carrierName: {
        sql: `${stg_pmsleasing_rentalInsurance.carrierName}`,                 
        type: `string`,
        title: `Carrier name`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },   
      
      policyNumber: {
        sql: `${stg_pmsleasing_rentalInsurance.policyNumber}`,                 
        type: `string`,
        title: `Policy number`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },  

      policyStatus: {
        sql: `${stg_pmsleasing_rentalInsurance.policyStatus}`,                 
        type: `string`,
        title: `Policy status`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },  
      
      policyStartDate: {
        sql: `${stg_pmsleasing_rentalInsurance.policyStart}`,                 
        type: `string`,
        title: `Policy start date`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },  

      policyEndDate: {
        sql: `${stg_pmsleasing_rentalInsurance.policyExpiration}`,                 
        type: `string`,
        title: `Policy end date`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },  
  },

  dataSource: `snowflake_pms`
});
