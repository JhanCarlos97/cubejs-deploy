cube(`stg_pmssreq_serviceRequestsAssignees`, {
  sql: `SELECT * FROM ${raw_pmssreq_serviceRequestsAssignees.sql()}`,  
   
  joins: {

    raw_pmssreq_customerUsers: {
      sql: `${stg_pmssreq_serviceRequestsAssignees}."USER_ID" = ${raw_pmssreq_customerUsers}."ID"`,
      relationship: `belongsTo`
    },         
  },


dimensions: {
  serviceRequestId: {
    sql: `${CUBE}."SERVICE_REQUEST_ID"`,
    type: `string`,
    primaryKey: true
  },

  assigneeId: {
    sql: `${raw_pmssreq_customerUsers.assigneeId}`,
    type: `string`
  },

  assignee: {
    sql: `${raw_pmssreq_customerUsers.assignee}`,
    type: `string`
  },
    
  },
  
  dataSource: `snowflake_pms`
});
