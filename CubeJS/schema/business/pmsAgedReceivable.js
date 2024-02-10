cube(`bus_pms_agedReceivable`, {
    sql: `SELECT * FROM ${stg_pms_accountUnpaidCharges.sql()}`,

    joins: {

    stg_pms_accountUnpaidChargesAgg: {
      sql: `
      ${stg_pms_accountUnpaidChargesAgg}.account_id = ${bus_pms_agedReceivable.accountId} AND
      ${stg_pms_accountUnpaidChargesAgg}.customer_id = ${bus_pms_agedReceivable.customerId} AND
      ${stg_pms_accountUnpaidChargesAgg}.business_unit_id = ${bus_pms_agedReceivable.businessUnitId}`,
      relationship: `hasOne`
    },

    stg_pms_accountPrepaidAmount: {
        sql: `${stg_pms_accountPrepaidAmount.accountId} = ${bus_pms_agedReceivable.accountId}`,
        relationship: `hasOne`
    },

    stg_pms_leasingDataAgg: {
      sql: `${stg_pms_leasingDataAgg.occupancyId} = ${bus_pms_agedReceivable.accountId}`,
      relationship: `hasOne`
  },

    },

    dimensions: {


        accountId: {
        sql: `${CUBE}.account_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },

        customerId: {
          sql: `${CUBE}.customer_id`,
          type: `string`,
          primaryKey: true,
          shown: true
        },

        past: {
          sql: `${stg_pms_leasingDataAgg.past}`,
          type: `boolean`,
          shown: true,
          title: `Past`,
          meta: {
            styleType: 'check',
            show: true,
            size: 99,
            sortable: true,
            toggleable: true,
            toggleTitle: "show past resident",
            headerTooltip: "Past resident"
          }
        },

        unit: {
          sql: `${stg_pms_leasingDataAgg.unit}`,
          type: `string`,
          title: `Unit`,
          meta: {
            styleType: 'textLeft',
            show: true,
            size: 76,
            sortable: true
          }
        },

        businessUnitId: {
          sql: `${CUBE}.business_unit_id`,
          type: `string`,
          primaryKey: true,
          shown: true
        },

        arNotes: {
          sql: `${CUBE}.ar_notes`,
          type: `string`,
          title: `AR Notes`,
          meta: {
            styleType: 'textLeft',
            show: true,
            size: 186,
            sortable: true
          }
        },

        postDate: {
          sql: `${CUBE}.post_date`,
          type: `time`
        },

        countAccountId: {
          sql: `${CUBE}.count_by_account_id`,
          type: `number`,
      },

        balancePerAccountId: {
          sql: `${stg_pms_accountPrepaidAmount.prepaidAmountAgg} - ${stg_pms_accountUnpaidChargesAgg.unpaidAmountAgg}`,
          type: `number`
          },

          resident: {
            sql: `${stg_pms_leasingDataAgg.resident}`,
            type: `string`,
            title: `Resident name`,
            meta: {
              styleType: 'textLeft',
              show: true,
              size: 190,
              sortable: true,
              noWrap: true
            }
          },
    },

    measures: {
        prepaidAmountNormalized: {
          sql: `${stg_pms_accountPrepaidAmount.prepaidAmountAgg} / ${bus_pms_agedReceivable.countAccountId}`,
          type: `number`
        },

        unpaidAmount: {
          sql: `${bus_pms_agedReceivable}.unpaid_amount`,
          type: `number`
          },

        balanceMeasure: {
        sql: `${bus_pms_agedReceivable.prepaidAmountNormalized} - ${bus_pms_agedReceivable.unpaidAmount}`,
        type: `sum`,
        title: `Balance`,
        meta: {
          styleType: 'money',
          show: true,
          size: 99,
          group: 7,
          sortable: true,
          layout: 'column'
        }
      },

        prepaidAmountMeasure: {
          sql: `${bus_pms_agedReceivable.prepaidAmountNormalized}`,
          type: `sum`,
          title: `Prepays`,
          meta: {
            styleType: 'money',
            show: true,
            size: 99,
            group: 6,
            sortable: true,
            layout: 'column'
          }
        },

          owed: {
          sql: `${bus_pms_agedReceivable.unpaidAmount}`,
          type: `sum`,
          title: `Owed`,
          meta: {
            styleType: 'money',
            show: true,
            size: 106,
            group: 5,
            sortable: true,
            layout: 'column'
          }
        },

          unpaidZero: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `${bus_pms_agedReceivable.postDate}
                  BETWEEN date_trunc('day', ${value}:: timestamp) - INTERVAL '30 days' AND date_trunc('day', ${value}:: timestamp)`)} 
                  THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
          type: `sum`,
          title: `0-30`,
          meta: {
            styleType: 'money',
            show: true,
            size: 77,
            group: 1,
            sortable: true,
            layout: 'column'
          }
        },

          unpaidThirty: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value)=> `${bus_pms_agedReceivable.postDate}
            BETWEEN date_trunc('day', ${value}:: timestamp) - INTERVAL '60 days' AND date_trunc('day', ${value}:: timestamp) - INTERVAL '31 days'`)} 
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `31-60`,
            meta: {
              styleType: 'money',
              show: true,
              size: 86,
              group: 2,
              sortable: true,
              layout: 'column'
            }
          },

          unpaidSixty: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value)=> `${bus_pms_agedReceivable.postDate}
            BETWEEN date_trunc('day', ${value}:: timestamp) - INTERVAL '90 days' AND date_trunc('day', ${value}:: timestamp) - INTERVAL '61 days'`)} 
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `61-90`,
            meta: {
              styleType: 'money',
              show: true,
              size: 86,
              group: 3,
              sortable: true,
              layout: 'column'
            }
          },

          unpaidNinety: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `${bus_pms_agedReceivable.postDate} 
            BETWEEN date_trunc('day', ${value}:: timestamp) - INTERVAL '9999 days' AND date_trunc('day', ${value}:: timestamp) - INTERVAL '91 days'`)} 
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `90+`,
            meta: {
              styleType: 'money',
              show: true,
              size: 70,
              group: 4,
              sortable: true,
              layout: 'column'
            }
          },

          unpaidCurrentMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivable.postDate}) = date_trunc('month', ${value}:: timestamp)`)}
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `$month`,
            meta: {
              styleType: 'money',
              show: true,
              size: 120,
              group: 1,
              sortable: true,
              layout: 'column'
            }
          },

          unpaidPreviousMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivable.postDate}) = date_trunc('month', ${value}:: timestamp) - INTERVAL '1 month'`)}
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `$month-1`,
            meta: {
              styleType: 'money',
              show: true,
              size: 120,
              group: 2,
              sortable: true,
              layout: 'column'
            }
          },

          unpaidPriorToPreviousMonth: {
            sql: `CASE WHEN ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `date_trunc('day', ${bus_pms_agedReceivable.postDate}) = date_trunc('month', ${value}:: timestamp) - INTERVAL '2 month'`)}
            THEN ${bus_pms_agedReceivable.unpaidAmount} ELSE 0 END`,
            type: `sum`,
            title: `Prior to $month-1`,
            meta: {
              styleType: 'money',
              show: true,
              size: 120,
              group: 3,
              sortable: true,
              layout: 'column'
            }
          },

        },

    segments: {
        negativeBalance: {
          sql: `${bus_pms_agedReceivable.balancePerAccountId} < 0`
        },
      },

    dataSource: `snowflake_pms`
    });
