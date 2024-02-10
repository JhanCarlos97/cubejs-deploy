cube(`bus_pmsaccounting_AccrualIncome`, {
    sql: `
      SELECT
        ld.unit,
        month(ch.post_date) || '-' || year(ch.post_date) as period,
        ch.post_date AS "DATE",
        ch.due_date AS "DUE",
        ga.gl_number,
        ga.gl_name,
        c.name AS code,
        credit.amount as credit,
        ch.amount AS charge,
        ch.charge_id,
        ch.account_id,
        c.community_id,
        ch.reference
        FROM ${raw_pmsaccounting_charge.sql()} ch
      LEFT JOIN ${raw_pmsaccounting_code.sql()} c ON c.id  = ch.code_id
      LEFT JOIN ${raw_pmsaccounting_codesChartAccounts.sql()} cca ON cca.code_id = c.id
      LEFT JOIN ${raw_pmsaccounting_glAccount.sql()} ga ON ga.gl_account_id = cca.chart_account_id
      LEFT JOIN ${raw_pmsaccounting_billItem.sql()} bi ON bi.bill_item_id = ch.bill_item_id
      LEFT JOIN ${raw_pmsaccounting_bill.sql()} b ON b.bill_id = bi.bill_id
      LEFT JOIN (
          SELECT
          SUM(ci.amount) as amount,
          ci.bill_id as bill_id
          FROM ${raw_pmsaccounting_creditItem.sql()} ci
          LEFT JOIN ${raw_pmsaccounting_credit.sql()} c ON c.credit_id = ci.credit_item_id
          LEFT JOIN ${raw_pmsaccounting_voidCreditItem.sql()} vci ON vci.credit_item_id = ci.credit_item_id
          WHERE vci.void_credit_item_id IS NULL
          AND (c.is_concession OR c.is_credit)
          GROUP BY bill_id
      )  credit ON credit.bill_id = b.bill_id
      LEFT JOIN (Select distinct unit, occupancyId from ${stg_pms_leasingData.sql()}) ld ON ld.occupancyId  = ch.account_id
      ORDER BY 1, 2, 3, 4`,

  joins: {

    // raw_pmsaccounting_code: {
    //     sql: `${bus_pmsaccounting_AccrualIncome.code_id} = ${stg_pmsaccounting_code.id}`,
    //     relationship: `belongsTo`
    //   },
    // raw_pmsaccounting_codesChartAccounts : {
    //     sql: `${stg_pmsaccounting_code.id} = ${stg_pmsaccounting_codesChartAccounts.code_id}`,
    //     relationship: `belongsTo`
    //   },

    // raw_pmsaccounting_glAccount : {
    //     sql: `${stg_pmsaccounting_codesChartAccounts.chart_account_id} = ${stg_pmsaccounting_glAccount.gl_account_id}`,
    //     relationship: `belongsTo`
    //   },

    // raw_pmsaccounting_billItem : {
    //     sql: `${bus_pmsaccounting_AccrualIncome.bill_item_id} = ${raw_pmsaccounting_billItem.bill_item_id}`,
    //     relationship: `belongsTo`
    //   },

    // raw_pmsaccounting_bill : {
    //     sql: `${raw_pmsaccounting_billItem.bill_id} = ${raw_pmsaccounting_bill.bill_id}`,
    //     relationship: `belongsTo`
    //   }
      // ,

    //   stg_pmsaccounting_AccrualIncomeCredit : {
    //     sql: `${raw_pmsaccounting_bill.bill_id} = ${stg_pmsaccounting_AccrualIncomeCredit.bill_id}`,
    //     relationship: `belongsTo`
    //   },

    },

    measures: {
      credit: {
        sql: `iff (${CUBE}.credit is null,0, ${CUBE}.credit)`,
        type: `sum`,
        title: `Credit`,
        meta: {
          styleType: 'money',
          show: true,
          size: 84
        }
      },
      charge: {
        sql: `iff (${CUBE}.charge is null,0, ${CUBE}.charge)`,
        type: `sum`,
        title: `Charge`,
        meta: {
          styleType: 'money',
          show: true,
          size: 88
        }
      },
      creditSum: {
        sql: `iff (${CUBE}.credit is null,0, ${CUBE}.credit)`,
        type: `sum`,
        title: `total credits`,
        meta: {
          styleType: 'money',
          show: true,
          size: 106,
          group: 1,
          layout: 'row'
        }
      },
      chargeSum: {
        sql: `iff (${CUBE}.charge is null,0, ${CUBE}.charge)`,
        type: `sum`,
        title: `total charges`,
        meta: {
          styleType: 'money',
          show: true,
          size: 106,
          group: 2,
          layout: 'row'
        }
      }
    },
    dimensions: {
      unit: {
        sql: `${CUBE}.unit`,
        type: `string`,
        title: `Unit`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 76,
          sortable: true
        }
      },
        period: {
          sql: `month(${CUBE}.date) || '-' || year(${CUBE}.date)`,
          type: `string`,
          title: `Period`,
          meta: {
            styleType: 'textRight',
            show: true,
            size: 88,
            sortable: true
          }
        },
        postDate: {
            sql: `${CUBE}.date`,
            type: `time`,
            title: `Date`,
            meta: {
              styleType: 'longDate',
              show: true,
              size: 99,
              sortable: true
            }
          },
        dueDate: {
            sql: `${CUBE}.due`,
            type: `time`,
            title: `Due date`,
            meta: {
              styleType: 'longDate',
              show: true,
              size: 106,
              sortable: true
            }
          },
        glNumber: {
            sql: `${CUBE}.gl_number`,
            type: `string`,
            title: `G/L account`,
            meta: {
              styleType: 'textRight',
              show: true,
              size: 127,
              sortable: true,
              filterPosition: 'key'
            }
          },
        glName: {
            sql: `${CUBE}.gl_name`,
            type: `string`,
            title: `G/L name`,
            meta: {
              styleType: 'textLeft',
              show: true,
              size: 311,
              sortable: true
            }
          },
        code: {
            sql: `${CUBE}.code`,
            type: `string`,
            title: `Charge code`,
            meta: {
              styleType: 'textRight',
              show: true,
              size: 120,
              sortable: true
            }
          },
        gl: {
            sql: `${CUBE}.gl_number || ' | ' || ${CUBE}.gl_name`,
            type: `string`,
            title: `g/l account`,
            meta: {
              styleType: 'textLeft',
              show: true,
              size: 106,
              filterPosition: 'label'
            }
          },
          balanceFlag: {
            sql: `iff (${CUBE}.credit + ${CUBE}.credit <> 0, true, false)`,
            type: `boolean`,
            title: `Balance`,
            meta: {
              styleType: 'boolean',
              show: false,
              size: 76,
              toggleable: true,
              toggleTitle: "show $0 balance items"
            }
          },
        communityId: {
            sql: `${CUBE}.community_id`,
            type: `string`,
            meta: {
              show: false
            }
          }
    },

    dataSource: `snowflake_pms`
  });
