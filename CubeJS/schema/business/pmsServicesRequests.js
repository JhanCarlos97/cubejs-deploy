cube(`bus_pms_servicesRequests`, {
  sql: `SELECT * FROM ${raw_pmssreq_requests.sql()}`,  
   
  joins: {

    raw_pmssreq_categories: {
      sql: `${bus_pms_servicesRequests}."CATEGORY" = ${raw_pmssreq_categories.id}`,
      relationship: `belongsTo`
    }, 
    
    raw_pmsleasing_unit: {
      sql: `${bus_pms_servicesRequests}."LOCATION_ID" = ${raw_pmsleasing_unit.unitId}
             and ${bus_pms_servicesRequests}."COMMUNITY_ID" = ${raw_pmsleasing_unit}."BUSINESS_UNIT_ID"`,
      relationship: `belongsTo`
    }, 

    stg_pmssreq_serviceRequestsAssignees: {
      sql: `${bus_pms_servicesRequests}."ID" = ${stg_pmssreq_serviceRequestsAssignees.serviceRequestId}`,
      relationship: `belongsTo`
    }, 
  },

  measures: {

    assignees: {
      sql: `listagg(distinct ${CUBE.assignee}, ', ') WITHIN GROUP (ORDER BY ${CUBE.assignee})`,
      type: `number`,
      meta: {
        size: 135,
        show: true,
        sortable: true,
        filterPosition: 'label'
    }
    },
},

  dimensions: {

    categoryId: {
      sql: `${CUBE}."CATEGORY"`,
      type: `string`,
      primaryKey: true
    },

    Id: {
      sql: `${CUBE}."ID"`,
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

    unit: {
      sql: `${raw_pmsleasing_unit.cUnitName}`,
      type: `string`,
      title: `Location`,
      meta: {
        styleType: "string",
        show: true,
        size: 100,
        sortable: true
      }
    },

    priority: {
      sql: `${CUBE}."PRIORITY"`,
      type: `string`,
      meta: {
        styleType: "string",
        show: true,
        size: 135,
        sortable: true,
        filterPosition: 'key,label'
      }
    },

    category: {
      sql: `${raw_pmssreq_categories.category}`,
      type: `string`,
      meta: {
        styleType: "string",
        show: true,
        size: 135,
        sortable: true
      }
    },

    status: {
      sql: `${CUBE}."STATE"`,
      type: `string`,
      meta:{
        styleType: "string",
        showStatusFlag: true,
        show: true,
        size: 135,
        sortable: true,
        filterPosition: 'key,label'
      }
    },
    
    createdDate: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `string`,
      meta: {
        styleType: "string",
        show: true,
        size: 135,
        sortable: true
      }
    },
    
    completionDate: {
      sql: `${CUBE}."AUTO_COMPLETED_AT"`,
      type: `string`,
      meta: {
        styleType: "string",
        show: true,
        size: 135,
        sortable: true
      }
    },

    daysToComplete: {
      sql: `DATEDIFF(DAY, ${CUBE.createdDate}, ${CUBE.completionDate})`,
      type: `string`,
      title: "Number of days to complete",
      meta: {
        styleType: "string",
        show: true
      }
    },
    
    assigneeId: {
      sql: `${stg_pmssreq_serviceRequestsAssignees.assigneeId}`,
      type: `string`,
      meta: {
          filterPosition: 'key'
      }
    },

    assignee: {
      sql: `${stg_pmssreq_serviceRequestsAssignees.assignee}`,
      type: `string`      
    },

  },
  
  dataSource: `snowflake_pms`
});

