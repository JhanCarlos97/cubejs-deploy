cube(`bus_web_metricsByCid`, {
  sql: `SELECT * FROM "vendor_name"."METRICS_BY_CID"`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {

    raw_web_hostnameMapping: {
      sql: `${raw_web_hostnameMapping.hostname} = ${bus_web_metricsByCid.hostname}`,
      relationship: `belongsTo`
    },
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [country, hostname, uuid, propertyId, date]
    },

    activeUsers: {
      sql: `ACTIVEUSERS`,
      type: `sum`
    },

    sessions: {
      sql: `SESSIONS`,
      type: `sum`
    },

    sessionsPerUser: {
      sql: `${CUBE.sessions} / ${CUBE.activeUsers}`,
      type: `number`
    },

    users: {
      sql: `TOTALUSERS`,
      type: `sum`,
      meta: {
        styleType: 'number',
        show: true,
        size: 150,
        sortable: true
      },
    },

    engagementTime: {
      sql: `USERENGAGEMENTDURATION`,
      type: `sum`
    },

    views: {
      sql: `SCREENPAGEVIEWS`,
      type: `sum`,
      meta: {
        styleType: 'number',
        show: true,
        size: 150,
        sortable: true}
    },

    viewsPerSession: {
      sql: `${CUBE.views} / ${CUBE.sessions}`,
      type: `number`
    },

    viewsPerUsers: {
      sql: `${CUBE.views} / ${CUBE.users}`,
      type: `number`,
      meta: {
        styleType: 'float',
        show: true,
        size: 150,
        sortable: true,
        roundDecimals: 2
      }
      },

    newUsers: {
      sql: `NEWUSERS`,
      type: `sum`
    }, 

    avgEngagementTime: {
      sql: `${CUBE.engagementTime} / ${CUBE.users}`,
      type: `number`
    },

    avgTimeDuration: {
      sql: `USERENGAGEMENTDURATION`,
      type: `avg`,
      meta: {
        styleType: 'duration',
        show: true,
        size: 150,
        sortable: true
      }
    },

    engagedSessions: {
      type: `sum`,
      sql: `ENGAGEDSESSIONS`,
    },

    bounceRate: {
      type: `number`,
      sql: `round((${CUBE.sessions} - ${CUBE.engagedSessions})*100.0/${CUBE.sessions},2)`,
    },
    
    percentageRateByCat: {
      type: `number`,
      sql: `round(${CUBE.users}*100.0/sum(${CUBE.users}) over(),2)`,
      format: `percent`
    },  

    conversionsByPageTitle: {
      sql: `${CUBE.scheduledTourConversionRate} + ${CUBE.contactFormSubmissionConversionRate} + ${CUBE.applicationConversionRate}`,
      type: `number`,
      format: `percent`,
    }, 

    contactFormSubmissionConversionRate: {
      sql: `ROUND(${CUBE.totalContactFormSubmission}*100.0/${CUBE.users}, 3)`,
      type: `number`,
      format: `percent`,
    }, 

    scheduledTourConversionRate: {
      sql: `ROUND(${CUBE.totalScheduledTour}*100.0/${CUBE.users}, 3)`,
      type: `number`,
      format: `percent`,
    }, 

    applicationConversionRate: {
      sql: `ROUND(${CUBE.totalApplication}*100.0/${CUBE.users}, 3)`,
      type: `number`,
      format: `percent`,
    },

    totalContactFormSubmission: {
      sql: `sum(CASE WHEN ${CUBE.eventName} = 'gtm.formSubmit' THEN ${CUBE}."TOTALUSERS" ELSE 0 END)`,
      type: `number`,
    }, 

    totalScheduledTour: {
      sql: `sum(CASE WHEN ${CUBE.eventName} = 'schedule-guest-card-completed' THEN ${CUBE}."TOTALUSERS" ELSE 0 END)`,
      type: `number`,
    }, 

    totalApplication: {
      sql: `sum(CASE WHEN 
                        upper(${CUBE.outbound}) = 'TRUE' THEN ${CUBE}."TOTALUSERS"
                ELSE 0 END)`,
      type: `number`,
    },

    conversionRate: {
      sql: `round(${CUBE.users}*100.0/sum(${CUBE.users}) over(),2)`,
      type: `number`,
      format: `percent`,
    },

    eventType: {
      sql: `case when ${CUBE.eventName} = 'gtm.formSubmit' then 'Contact'
              when ${CUBE.eventName} = 'schedule-guest-card-completed' then 'Tour'
              when  upper(${CUBE.outbound})='TRUE'
              then 'App'
            else '' end`,
      type: `string`
    },

    conversionRatebyEventTitle: {
      sql: `(${CUBE.users} OVER (PARTITION BY ${CUBE.categoryTypeName}	, ${CUBE.pageTitle}) ) / ${CUBE.users} over(PARTITION BY ${raw_web_hostnameMapping.communityId}, ${CUBE.pageTitle})`,
      type: `number`
    },

    pageTitleDistinct: {
      sql: `distinct ${CUBE}."PAGETITLE"`,
      type: `string`
    },

  },

  dimensions: {

    region: {
      sql: `${CUBE}."REGION"`,
      type: `string`
    },  
    
    country: {
      sql: `${CUBE}."COUNTRY"`,
      type: `string`
    },


    city: {
      sql: `${CUBE}."CITY"`,
      type: `string`
    },
    
    hostname: {
      sql: `${CUBE}."HOSTNAME"`,
      type: `string`,
      primaryKey: true
    },
    
    userengagementduration: {
      sql: `${CUBE}."USERENGAGEMENTDURATION"`,
      type: `string`
    },
    
    screenpageviewsperuser: {
      sql: `${CUBE}."SCREENPAGEVIEWSPERUSER"`,
      type: `string`
    },
    
    uuid: {
      sql: `${CUBE}."UUID"`,
      type: `string`
    },
    
    sessionsperuser: {
      sql: `${CUBE}."SESSIONSPERUSER"`,
      type: `string`
    },
    
    propertyId: {
      sql: `${CUBE}."PROPERTY_ID"`,
      type: `string`
    },
    
    date: {
      sql: `${CUBE}."DATE"`,
      type: `string`
    },

    dateFormatted: {
      sql: `TO_DATE(${date}, 'YYYYMMDD')`,
      type: `time`
    },

    dateFormattedByDay: {
      sql: `${CUBE}."DATE"`,
      type: `string`
    },

    firstUserDefaultChannel: {
      sql: `${CUBE}."FIRSTUSERDEFAULTCHANNELGROUP"`,
      type: `string`
    },
    
    categoryTypeName: {
      sql: `CASE WHEN ${CUBE.eventName} = 'gtm.formSubmit' THEN 'Contact'
            WHEN ${CUBE.eventName} = 'schedule-guest-card-completed' then 'Tour'
            WHEN  upper(${CUBE.outbound})='TRUE'
              then 'App'
          end`,
      type: `string`
    },


    outbound: {
      sql: `${CUBE}."OUTBOUND"`,
      type: `string`
    },

    pageTitle: {
      sql: `${CUBE}."PAGETITLE"`,
      type: `string`
    },

    eventName: {
      sql: `${CUBE}."EVENTNAME"`,
      type: `string`
    },
    
    pagePath: {
      sql: `${CUBE}."PAGEPATH"`,
      type: `string`,
      meta: {
        styleType: 'string',
        show: true,
        size: 300,
        sortable: true
      }
    },

    conversionType: {
      sql: `'Scheduled Tour'`,
      type: `string`
    },
    
  },

  segments: {
    removeNullCat: {
      sql: `${CUBE.categoryTypeName} IS NOT NULL`
    }
  },

  dataSource: `snowflake_ga`
  
});
