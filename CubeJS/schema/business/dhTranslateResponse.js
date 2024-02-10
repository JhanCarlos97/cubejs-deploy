cube(`bus_another_provider_TranslateResponseCustom`, {
  sql: `
  SELECT 
      *
  FROM ${stg_another_provider_CustomAll.sql()}
  `,
  sqlAlias: `TranslateResponseCustom`,

    

  measures: {
    totalResponses: {
      type: `sum`,
      sql: `1`,
      title: `total responses`,   
      meta: {
        styleType: `text`,
        show: true,
        group: 1,
      }
      },

    translatedResponses: {
      type: `sum`,
      sql: `CASE WHEN ${translateStatus} = 'translated' THEN 1 ELSE 0 END`,
      title: `translated responses`,
      meta: {
        styleType: `text`,
        show: true,
        group: 1,
        percentageValue: `bus_another_provider_TranslateResponseCustom.translatedResponsesPercentage`
      }
      },

    outdatedTranslations: {
      type: `sum`,
      sql: `CASE WHEN ${translateStatus} = 'outDatedTranslated' THEN 1 ELSE 0 END`,
      title: `outdated translation`,
      meta: {
        styleType: `text`,
        show: true,
        group: 2,
        percentageValue: `bus_another_provider_TranslateResponseCustom.outdatedTranslationsPercentage`
      }
      },

    missingTranslations: {
      type: `sum`,
      sql: `CASE WHEN ${translateStatus} = 'notTranslated' THEN 1 ELSE 0 END`,
      title: `missing translation`,
      meta: {
        styleType: `text`,
        show: true,
        group: 2,
        percentageValue: `bus_another_provider_TranslateResponseCustom.missingTranslationsPercentage`
      }
      },

    translatedResponsesPercentage: {
      type: `number`,
      sql: `coalesce(cast(100 * ${translatedResponses}::float / ${totalResponses} as decimal(18,1)),0)`,
      format: `percent`,
      meta: {
        styleType: `text`,
        subType: `percentage`,
        show: true,
        group: 1,
      }
      },

    outdatedTranslationsPercentage: {
      type: `number`,
      sql: `coalesce(cast(100 * ${outdatedTranslations}::float / ${totalResponses} as decimal(18,1)),0)`,
      meta: {
        styleType: `text`,
        subType: `percentage`,
        show: true,
        group: 2
      }
      },

    missingTranslationsPercentage: {
      type: `number`,
      sql: `coalesce(cast(100 * ${missingTranslations}::float / ${totalResponses} as decimal(18,1)),0)`,
      meta: {
        styleType: `text`,
        subType: `percentage`,
        show: true,
        group: 2
      }
      },

    },
  
  dimensions: {

    mainTopic: {
      sql: `MainTopic`,
      type: `string`,
      title: `Main topic`,
      meta: {
        styleType: 'text',
        sortable: true,
        size: 138,
        show: true
      }
    },

    conversationDetail: {
      sql: `CnversationDetail`,
      type: `string`,
      title: `Topic`,
      meta: {
        styleType: 'text',
        sortable: true,
        size: 117,
        show: true
      }
    },

    nextLevelDetail: {
      sql: `NextLevelDetail`,
      type: `string`,
      title: `Subtopic`,
      meta: {
        styleType: 'text',
        sortable: true,
        size: 109,
        show: true
      }
    },
    
    translateStatus: {
      sql: `translate_status`,
      type: `string`,
      title: `Translated`,
      meta: {
        styleType: 'check',
        size: 97,
        sortable: true,
        show: true
      }
    },

    responseText: {
      sql: `ResponseText`,
      type: `string`,
      title: `Response`,
      meta: {
        styleType: 'text',
        size: 315.5,
        show: true
      }
    },

    spanishResponseText: {
      sql: `SpanishResponseText`,
      type: `string`,
      title: `Translate`,
      meta: {
        styleType: 'text',
        size: 315.5,
        show: true
      }
    },

    intentName: {
      sql: `intent_name`,
      type: `string`
    },

    intentResponseId: {
      sql: `intent_response_id`,
      type: `string`
    },

    communityIntentId: {
      sql: `community_intent_id`,
      type: `string`
    },

    indicatesFeatureNotPresent: {
      sql: `indicates_feature_not_present`,
      type: `string`
    },

    communityName: {
      sql: `community_name`,
      type: `string`
    },   

    communityId: {
      sql: `community_id`,
      type: `string`
    },   

    flagged: {
      sql: `flagged`,
      type: `string`,
      title: `Flagged`
    },   

    approved: {
      sql: `approved`,
      type: `string`,
      title: `Approved`
    },   

    disabled: {
      sql: `disabled`,
      type: `string`,
      title: `Disabled`
    },   

    blocked: {
      sql: `blocked`,
      type: `string`,
      title: `Blocked`
    },   

  },
  
  dataSource: `snowflake_vendor_source`
});

cube(`bus_another_provider_TranslateResponseGlobal`, {
    sql: `
    SELECT 
        *
    FROM ${stg_another_provider_GlobalRest.sql()}
    UNION
    SELECT 
        *
    FROM ${stg_another_provider_GlobalDefault.sql()}
    `,
    sqlAlias: `TranslateResponseGlobal`,    

      measures: {
        totalResponses: {
          type: `sum`,
          sql: `1`,
          title: `total responses`,
          meta: {
            styleType: 'text',
            show: true,
            "group": 1 
          }
          },
    
        translatedResponses: {
          type: `sum`,
          sql: `CASE WHEN ${translateStatus} = 'translated' THEN 1 ELSE 0 END`,
          title: `translated responses`,
          meta: {
            styleType: 'text',
            show: true,
            group: 1,
            percentageValue: `bus_another_provider_TranslateResponseGlobal.translatedResponsesPercentage`
          }
          },
    
        outdatedTranslations: {
          type: `sum`,
          sql: `CASE WHEN ${translateStatus} = 'outDatedTranslated' THEN 1 ELSE 0 END`,
          title: `outdated translation`,
          meta: {
            styleType: `text`,
            show: true,
            percentageValue: `bus_another_provider_TranslateResponseGlobal.outdatedTranslationsPercentage`
          }
          },
    
        missingTranslations: {
          type: `sum`,
          sql: `CASE WHEN ${translateStatus} = 'notTranslated' THEN 1 ELSE 0 END`,
          title: `missing translation`,
          meta: {
            styleType: `text`,
            show: true,
            percentageValue: `bus_another_provider_TranslateResponseGlobal.missingTranslationsPercentage`
          }
          },

        translatedResponsesPercentage: {
          type: `number`,
          sql: `coalesce(cast(100 * ${translatedResponses}::float / ${totalResponses} as decimal(18,1)),0)`,
          format: `percent`,
          meta: {
            styleType: `text`,
            subType: `percentage`,
            show: true
          }
          },

        outdatedTranslationsPercentage: {
          type: `number`,
          sql: `coalesce(cast(100 * ${outdatedTranslations}::float / ${totalResponses} as decimal(18,1)),0)`,
          meta: {
            styleType: `text`,
            subType: `percentage`,
            show: true,
            group: 2
          }
          },
  
        missingTranslationsPercentage: {
          type: `number`,
          sql: `coalesce(cast(100 * ${missingTranslations}::float / ${totalResponses} as decimal(18,1)),0)`,
          meta: {
            styleType: `text`,
            subType: `percentage`,
            show: true,            
            group: 2
          }
          },

        },
    
      dimensions: {

        mainTopic: {
          sql: `MainTopic`,
          type: `string`,
          title: `Main topic`,
          meta: {
            styleType: 'text',
            sortable: true,
            size: 138,
            show: true
          }
        },
    
        conversationDetail: {
          sql: `ConversationDetail`,
          type: `string`,
          title: `Topic`,
          meta: {
            styleType: 'text',
            sortable: true,
            size: 117,
            show: true
          }
        },
    
        nextLevelDetail: {
          sql: `NextLevelDetail`,
          type: `string`,
          title: `Subtopic`,
          meta: {
            styleType: 'text',
            sortable: true,
            size: 109,
            show: true
          }
        },
        
        translateStatus: {
          sql: `translate_status`,
          type: `string`,
          title: `Translated`,
          meta: {
            styleType: 'check',
            size: 97,
            sortable: true,
            show: true
          }
        },
    
        responseText: {
          sql: `ResponseText`,
          type: `string`,
          title: `Response`,
          meta: {
            styleType: 'text',
            size: 315.5,
            show: true
          }
        },
    
        spanishResponseText: {
          sql: `SpanishResponseText`,
          type: `string`,
          title: `Translate`,
          meta: {
            styleType: 'text',
            size: 315.5,
            show: true
          }
        },
    
        intentResponseId: {
          sql: `intent_response_id`,
          type: `string`
        },

        intentName: {
          sql: `intent_name`,
          type: `string`
        },

        indicatesFeatureNotPresent: {
          sql: `indicates_feature_not_present`,
          type: `string`
        },
    
        defaultResponseId: {
          sql: `default_response_id`,
          type: `string`
        },
    
        intentNameParent: {
          sql: `intent_name_parent`,
          type: `string`
        },  
        
        numberOfCommunities: {
          sql: `number_of_communities`,
          type: `number`
        },  
    
      },
    
    dataSource: `snowflake_vendor_source`
  });