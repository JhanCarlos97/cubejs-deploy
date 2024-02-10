cube(`stg_pmsaccounting_communities`, {
  sql: `SELECT * FROM ${raw_pmsaccounting_communities.sql()}`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [customerId, communityId, communityLogoId, name, timezoneId, communityImageId, createdAt, updatedAt]
    },
    
    tourDuration: {
      sql: `${CUBE}."TOUR_DURATION"`,
      type: `sum`
    }
  },
  
  dimensions: {
    owner: {
      sql: `${CUBE}."OWNER"`,
      type: `string`
    },
    
    instagramUrl: {
      sql: `${CUBE}."INSTAGRAM_URL"`,
      type: `string`
    },
    
    email: {
      sql: `${CUBE}."EMAIL"`,
      type: `string`
    },
    
    facebookUrl: {
      sql: `${CUBE}."FACEBOOK_URL"`,
      type: `string`
    },
    
    customerId: {
      sql: `${CUBE}."CUSTOMER_ID"`,
      type: `string`
    },
    
    floorplansUrl: {
      sql: `${CUBE}."FLOORPLANS_URL"`,
      type: `string`
    },
    
    virtualTourUrl: {
      sql: `${CUBE}."VIRTUAL_TOUR_URL"`,
      type: `string`
    },
    
    communityId: {
      sql: `${CUBE}."COMMUNITY_ID"`,
      type: `string`,
      primaryKey: true
    },
    
    tourSchedulingModel: {
      sql: `${CUBE}."TOUR_SCHEDULING_MODEL"`,
      type: `string`
    },
    
    websiteUrl: {
      sql: `${CUBE}."WEBSITE_URL"`,
      type: `string`
    },
    
    isDeleted: {
      sql: `${CUBE}."IS_DELETED"`,
      type: `string`
    },
    
    communityLogoId: {
      sql: `${CUBE}."COMMUNITY_LOGO_ID"`,
      type: `string`
    },
    
    twitterUrl: {
      sql: `${CUBE}."TWITTER_URL"`,
      type: `string`
    },
    
    communityLogoUrl: {
      sql: `${CUBE}."COMMUNITY_LOGO_URL"`,
      type: `string`
    },
    
    leasingEmail: {
      sql: `${CUBE}."LEASING_EMAIL"`,
      type: `string`
    },
    
    onlinePaymentEmail: {
      sql: `${CUBE}."ONLINE_PAYMENT_EMAIL"`,
      type: `string`
    },
    
    smsPhone: {
      sql: `${CUBE}."SMS_PHONE"`,
      type: `string`
    },
    
    name: {
      sql: `${CUBE}."NAME"`,
      type: `string`
    },
    
    pinterestUrl: {
      sql: `${CUBE}."PINTEREST_URL"`,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}."DESCRIPTION"`,
      type: `string`
    },
    
    timezoneId: {
      sql: `${CUBE}."TIMEZONE_ID"`,
      type: `string`
    },
    
    communityImageUrl: {
      sql: `${CUBE}."COMMUNITY_IMAGE_URL"`,
      type: `string`
    },
    
    phone: {
      sql: `${CUBE}."PHONE"`,
      type: `string`
    },
    
    corporateUrl: {
      sql: `${CUBE}."CORPORATE_URL"`,
      type: `string`
    },
    
    communityImageId: {
      sql: `${CUBE}."COMMUNITY_IMAGE_ID"`,
      type: `string`
    },
    
    createdAt: {
      sql: `${CUBE}."CREATED_AT"`,
      type: `time`
    },
    
    updatedAt: {
      sql: `${CUBE}."UPDATED_AT"`,
      type: `time`
    },
    
    deletedAt: {
      sql: `${CUBE}."DELETED_AT"`,
      type: `time`
    }
  },
  
  dataSource: `snowflake_pms`
});
