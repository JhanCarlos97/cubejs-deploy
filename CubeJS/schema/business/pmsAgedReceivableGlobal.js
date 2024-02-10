cube(`bus_pms_agedReceivableGlobal`, {
    sql: `SELECT * FROM ${stg_pmsaccounting_communities.sql()}`,

    joins: {

    stg_pms_accountUnpaidCharges: {
      sql: `
      ${stg_pms_accountUnpaidCharges.businessUnitId} = ${bus_pms_agedReceivableGlobal.communityId}`,
      relationship: `belongsTo`
    },

    stg_pms_accountUnpaidChargesAggGlobal: {
      sql: `
      ${stg_pms_accountUnpaidChargesAggGlobal.businessUnitId} = ${bus_pms_agedReceivableGlobal.communityId}`,
      relationship: `hasOne`
    },

    stg_pms_accountPrepaidAmountGlobal: {
        sql: `${stg_pms_accountPrepaidAmountGlobal.businessUnitId} = ${bus_pms_agedReceivableGlobal.communityId}`,
        relationship: `hasOne`
    },

    stg_pms_billedOver500Global: {
      sql: `${stg_pms_billedOver500Global.businessUnitId} = ${bus_pms_agedReceivableGlobal.communityId}`,
      relationship: `hasOne`
  },

    
    },

    dimensions: {

        customerId: {
          sql: `${CUBE}.customer_id`,
          type: `string`,
          primaryKey: true,
          shown: true
        },

        communityId: {
          sql: `${CUBE}.community_id`,
          type: `string`,
          primaryKey: true,
          shown: true
        },

        propName: {
          sql: `${CUBE}.name`,
          type: `number`,
          title: 'Property name',
          meta: {
            styleType: 'textLeft',
            show: true,
            sortable: true,
            PMR15: 1,
            size: 225
          }
        },

        postDate: {
          sql: `${stg_pms_accountUnpaidCharges.postDate}`,
          type: `time`,
        },

        unpaidAmount: {
          sql: `COALESCE(${stg_pms_accountUnpaidChargesAggGlobal.unpaidAmountAgg}, 0)`,
          type: `number`,
          title: 'Owed',
          meta: {
            styleType: 'money',
            show: true,
            sortable: true,
            PMR15: 9
          }
          },

        prepaidAmount: {
          sql: `COALESCE(${stg_pms_accountPrepaidAmountGlobal.prepaidAmountAgg}, 0)`,
          type: `number`,
          title: `Prepaid`,
          meta: {
            styleType: 'money',
            show: true,
            sortable: true,
            PMR15: 10,
            size: 97
          }
        },

        balanceMeasure: {
          sql: `${bus_pms_agedReceivableGlobal.prepaidAmount} - ${bus_pms_agedReceivableGlobal.unpaidAmount}`,
          type: `number`,
          title: `Balance`,
          meta: {
            styleType: 'money',
            show: true,
            sortable: true,
            PMR15: 2,
            size: 99
          }
        },

      currentMonthPlus500: {
          sql: `${stg_pms_billedOver500Global.currentMonthPlus500}`,
          type: `number`,
          title: `$month 500+`,
          meta: {
            styleType: 'textRight',
            show: true,
            sortable: true,
            PMR15: 6,
            size: 138
          }
        },

      previousMonthPlus500: {
          sql: `${stg_pms_billedOver500Global.previousMonthPlus500}`,
          type: `number`,
          title: `$month-1 500+`,
          meta: {
            styleType: 'number',
            show: true,
            size: 166,
            sortable: true,
            PMR15: 7
          }
        },

      priorPreviousMonthPlus500: {
          sql: `${stg_pms_billedOver500Global.priorPreviousMonthPlus500}`,
          type: `number`,
          title: `Prior to $month-1 500+`,
          meta: {
            styleType: 'number',
            show: true,
            size: 223,
            sortable: true,
            PMR15: 8
          }
        },

    },

    measures: {

          // propName: {
          //   sql: `listagg(distinct ${CUBE}.name) WITHIN GROUP (ORDER BY ${CUBE}.name)`,
          //   type: `number`
          // },

          unpaidCurrentMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivableGlobal.postDate}) = date_trunc('month', ${value}:: timestamp)`)}
            THEN ${stg_pms_accountUnpaidChargesAggGlobal.unpaidAmountAgg} ELSE 0 END`,
            type: `sum`,
            title: `$month`,
            meta: {
              styleType: 'money',
              sortable: true,
              show: true,
              PMR15: 3,
              size: 99
            }
          },

          unpaidPreviousMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivableGlobal.postDate}) = date_trunc('month', ${value}:: timestamp) - INTERVAL '1 month'`)}
            THEN ${stg_pms_accountUnpaidChargesAggGlobal.unpaidAmountAgg} ELSE 0 END`,
            type: `sum`,
            title: `$month-1`,
            meta: {
              styleType: 'money',
              sortable: true,
              show: true,
              PMR15: 4,
              size: 113
            }
          },

          unpaidPriorToPreviousMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivableGlobal.postDate}) = date_trunc('month', ${value}:: timestamp) - INTERVAL '2 month'`)}
            THEN ${stg_pms_accountUnpaidChargesAggGlobal.unpaidAmountAgg} ELSE 0 END`,
            type: `sum`,
            title: `Prior to $month-1`,
            meta: {
              styleType: 'money',
              sortable: true,
              show: true,
              PMR15: 5,
              size: 170
            }
          },

        },

    dataSource: `snowflake_pms`
    });
