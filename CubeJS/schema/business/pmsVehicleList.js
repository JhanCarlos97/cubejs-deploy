cube(`bus_pmsVehicleList`, {
    sql: `${raw_pmsleasing_vehicle.sql()}`,

    joins: {
      bus_pms_residentList: {
        sql: `${bus_pmsVehicleList}."PRIMARY_DRIVER_PARTY_ID" = ${bus_pms_residentList}."PARTY_ID"`,
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

      makeAndModel: {
        sql: `${CUBE}."VEHICLE_MAKE" || ' ' || ${CUBE}."VEHICLE_MODEL"`,                 
        type: `string`,
        title: `Vehicle Make & Model`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },

      color: {
        sql: `${CUBE}."VEHICLE_COLOR"`,                 
        type: `string`,
        title: `Vehicle Color`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
    },

    licensePlate: {
      sql: `${CUBE}."VEHICLE_LICENSE_PLATE_TEXT"`,                 
      type: `string`,
      title: `License plate`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }
    },

    state: {
        sql: `${CUBE}."LICENSE_PLATE_REGION"`,                 
        type: `string`,
        title: `Vehicle state`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }
      },

    parkingType: {
        sql: `${bus_pms_residentList.residentType}`,                 
        type: `string`,
        title: `Parking type`,
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
  
     moveInDate: {
      sql: `${bus_pms_residentList.moveInDate}`,                 
      type: `string`,      
      title: `Move In Date`,
      meta: {        
        show: true,        
      }
    },

    householdMoveOutDate: {
      sql: `${bus_pms_residentList.householdMoveOutDate}`,                 
      type: `string`,      
      title: `Move Out Date`,
      meta: {        
        show: true,        
      }
    },
  },
    dataSource: `snowflake_pms`
});
