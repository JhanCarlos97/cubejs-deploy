cube(`bus_pms_rentableItems`, {
    sql: `${raw_pmsri_reservations.sql()}`,

    joins: {
      raw_pmsri_offers: {
        sql: `${bus_pms_rentableItems}."RI_ID" = ${raw_pmsri_offers.id}`,
        relationship: `belongsTo`
        },
      raw_pmsri_offers_items: {
        sql: `${bus_pms_rentableItems}."ITEM_ID" = ${raw_pmsri_offers_items.id}`,
        relationship: `belongsTo`
        },
        stg_pms_profiles: {
        sql: `${bus_pms_rentableItems}."PROFILE_ID" = ${stg_pms_profiles.id}`,
        relationship: `belongsTo`
        },
      },

      measures: {          
        residents: {          
          sql: `listagg(distinct ${stg_pms_profiles.residents}, ', ') WITHIN GROUP (ORDER BY ${stg_pms_profiles.residents})`,
          type: `string`,
          title: `Resident`,
          meta: {
            styleType: 'text',
            show: false,
            size: 324,
            showOnHeaderBox: true,
            showLabelOnHeaderBox: true,
            isGroupIdentifier: false
          } 
        },
      },
   
    dimensions: {

      communityId: {
        sql: `${stg_pms_profiles.communityId}`,
        type: `string`,
      },

      reservationStartDate: {
        sql: `${CUBE}."START_DT"`,
        type: `time`,
        title: `Reservation start date`,
        meta: {
          styleType: 'longDate',
          show: true,
          showOnHeaderBox: false,
          showLabelOnHeaderBox: false,
          isGroupIdentifier: false
        }
    },

    reservationStartDateDummy: {
      sql: `${CUBE}."START_DT"`,
      type: `time`,     
      meta: {
        styleType: 'longDate',
        show: false,        
      }
  },

    reservationEndDate: {
      sql: `${CUBE}."END_DT"`,
      type: `time`,
      title: `Reservation end date`,
      meta: {
        styleType: 'longDate',
        show: true,
        showOnHeaderBox: false,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: false
      }
  },

    reservationStatus: {
      sql: `${CUBE}."STATUS"`,
      type: `string`,
      title: `Status`,
      meta: {
        styleType: 'text',
        show: true,
        showOnHeaderBox: false,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: false
      }
  },

  recurrentAmount: {
      sql: `${raw_pmsri_offers.recurrentAmount}`,
      type: `number`,
      title: `Recurrent amount`,
      meta: {
        styleType: 'text',
        show: true,
        showOnHeaderBox: false,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: false
      }
  },


  rentableItems: {
    sql: `${raw_pmsri_offers.rentableItems}`,
    type: `string`,
    title: `Rentable items`,
    meta: {
      styleType: 'text',
      show: true,
      showOnHeaderBox: true,
      showLabelOnHeaderBox: true,
      isGroupIdentifier: false
      }
    },

    unitName: {
    sql: `${stg_pms_profiles.unitName}`,
    type: `string`,
    title: `Unit`,
    meta: {
      styleType: 'textLeft',
      show: false,
      showOnHeaderBox: true,
      showLabelOnHeaderBox: true,
      isGroupIdentifier: true
      }
    }, 

  phoneNumber: {
      sql: `${stg_pms_profiles.phoneNumber}`,
      type: `string`,
      title: `Phone number`,
      meta: {
        styleType: 'text',
        show: false,
        showOnHeaderBox: false,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: false
      }
    },

    vehicleMakeModel: {
        sql: `${stg_pms_profiles.vehicleMakeModel}`,
        type: `string`,
        title: `Vehicle make & model`,
        meta: {
          styleType: 'text',
          show: true,
          showOnHeaderBox: false,
          showLabelOnHeaderBox: false,
          isGroupIdentifier: false
        }
    },

    vehicleColor: {
        sql: `${stg_pms_profiles.vehicleColor}`,
        type: `string`,
        title: `Vehicle color`,
        meta: {
          styleType: 'text',
          show: true,
          showOnHeaderBox: false,
          showLabelOnHeaderBox: false,
          isGroupIdentifier: false
        }
    },

    licensePlate: {
        sql: `${stg_pms_profiles.licensePlate}`,
        type: `string`,
        title: `License plate`,
        meta: {
          styleType: 'text',
          show: true,
          showOnHeaderBox: false,
          showLabelOnHeaderBox: false,
          isGroupIdentifier: false
        }
    },

    licensePlateRegion: {
        sql: `${stg_pms_profiles.licensePlateRegion}`,
        type: `string`,
        title: `Vehicle state`,
        meta: {
          styleType: 'text',
          show: true,
          showOnHeaderBox: false,
          showLabelOnHeaderBox: false,
          isGroupIdentifier: false
        }
    },
  
}, 

    dataSource: `snowflake_pms`
});
