cube(`bus_another_provider_CustomerCustomResponse`, {
  sql: `
  SELECT * FROM ${stg_another_provider_CommunityIntentUsesCommunityIntentResponse.sql()}`,
  
  joins: {

    stg_another_provider_CommunityIntent: {
        sql: `${bus_another_provider_CustomerCustomResponse.communityIntentId} = ${stg_another_provider_CommunityIntent.idCommunityIntent}`,
        relationship: `belongsTo`
      },

    stg_another_provider_Intent: {
      sql: `${bus_another_provider_CustomerCustomResponse.intentName} = ${stg_another_provider_Intent.intentName}`,
      relationship: `belongsTo`
    },

    stg_another_provider_IntentResponse: {
      sql: `${bus_another_provider_CustomerCustomResponse.intentResponseId} = ${stg_another_provider_IntentResponse.idIntentResponse}`,
      relationship: `belongsTo`
    },

  },
  
  measures: {
    totalCreated: {
      type: `count`,
      drillMembers: [intentResponseId],
      title: `Total Responses Created`,
      meta: {
        styleType: 'text',
        show: true
      }
    },
    totalActive: {
      type: `sum`,
      sql: `${activeSum}`,
      title: `Total Active`,
      meta: {
        styleType: 'text',
        show: true
      }
    },
  },
  
  dimensions: {

    communityIntentId: {
        sql: `community_intent_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },

      customerName: {
        sql: `${stg_another_provider_CommunityIntent.customerName}`,
        type: `string`,
      },

      intentName: {
        sql: `intent_name`,
        type: `string`
      },

      intentCategoryName: {
        sql: `intent_category_name`,
        type: `string`
      },

      intentResponseId: {
        sql: `intent_response_id`,
        type: `string`
      },

      flagged: {
        sql: `CASE WHEN flagged = 0 THEN FALSE ELSE TRUE END`,
        type: `string`,
        title: `Flagged`,
        meta: {
          styleType: 'check',
          sortable: true,
          size: 102,
          show: true
        }
      },

      frozen: {
        sql: `CASE WHEN blocked = 0 THEN FALSE ELSE TRUE END`,
        type: `string`,
        title: `Frozen`,
        meta: {
          styleType: 'check',
          sortable: true,
          size: 94,
          show: true
        }
      },

      reviewed: {
        sql: `CASE WHEN approved = 0 THEN FALSE ELSE TRUE END`,
        type: `string`,
        title: `Reviewed`,
        meta: {
          styleType: 'check',
          sortable: true,
          size: 114,
          show: true
        }
      },

      disabled: {
        sql: `disabled`,
        type: `string`
      },

      active: {
        sql: `
        CASE
          WHEN ${disabled} = 0 THEN TRUE 
          ELSE FALSE
        END
          `,
        type: `string`,
        meta: {
          styleType: 'check',
          sortable: true,
          size: 91,
          show: true
        }
      },

      activeSum: {
        sql: `
        CASE
          WHEN ${disabled} = 0 THEN 1 
          ELSE 0
        END
          `,
        type: `number`,
        title: `Active`
      },

  },

  segments: {

  defaultSegment: {
      sql: `
      ${stg_another_provider_IntentParent.suggestionText} IS NOT NULL
      AND ${stg_another_provider_Intent.disabledAt} IS NULL`
  },

  innerJoinSegment: {
    sql: `
    ${stg_another_provider_CommunityIntent.customerId} IS NOT NULL
    AND ${stg_another_provider_IntentResponse.idIntentResponse} IS NOT NULL
    AND ${stg_another_provider_Intent.intentName} IS NOT NULL
    AND ${stg_another_provider_Community.idCommunity} IS NOT NULL
    AND ${stg_another_provider_Customer.idCustomer} IS NOT NULL`
},

  customerSegment: {
    sql: `
    ${bus_another_provider_CustomerCustomResponse.intentName} IS NOT NULL
    AND ${stg_another_provider_Customer.idCustomer} IS NOT NULL`
  }

  },
  
  dataSource: `snowflake_vendor_source`
});

