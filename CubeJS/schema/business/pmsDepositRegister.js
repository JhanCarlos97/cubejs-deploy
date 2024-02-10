cube(`bus_pms_depositRegister`, {
    sql: `SELECT * FROM ${stg_pmsaccounting_payment.sql()}`,
    
    preAggregations: {
      // Pre-Aggregations definitions go here
      // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
    },

    joins: {

      stg_pmsaccounting_deposit: {
        sql: `${bus_pms_depositRegister.depositId} = ${stg_pmsaccounting_deposit.depositId}`,
        relationship: `belongsTo`
      },

      stg_pmsleasing_occupancy: {
        sql: `${bus_pms_depositRegister.accountId} = ${stg_pmsleasing_occupancy.occupancyId}`,
        relationship: `belongsTo`}, 

      stg_pmsleasing_party: {
      sql: `${bus_pms_depositRegister.payerId} = ${stg_pmsleasing_party.partyId}`,
      relationship: `belongsTo`}, 
    },
    
    measures: {
      count: {
        type: `count`,
        drillMembers: [depositId, paymentId, accountId, transactionId, createdAt, updatedAt, paymentDate],
        title: `total count`,
        meta: {
          styleType: 'textLeft'
        }
      },

      totalAmount: {
        sql: `sum(${CUBE.accrualAmount}) over (partition by ${CUBE.paymentMonth}, ${stg_pmsaccounting_deposit.batchId}, ${stg_pmsaccounting_deposit.bankName})`,
        type: `number`,
        title: `Total`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          colorStyle: "PAINTED"
        },
      },

      accrualAmount: {
        sql: `coalesce(${CUBE}."ACCRUAL_AMOUNT",0)`,
        type: `sum`,
        title: `total amount`,
        meta: {
          styleType: 'money',
          show: true,
          size: 175,
          sortable: true
        },
      },
    },
    
    dimensions: {

      fullname: {
        sql: `${stg_pmsleasing_party.fullname}`,
        type: `string`,
        title: 'Payer',
        meta: {
          styleType: 'text',
          show: true,
          size: 671,
          sortable: true
        },
      },

      unitName: {
        sql: `${stg_pmsleasing_occupancy.unitName}`,
        type: `string`,
        title: 'Unit',
        meta: {
          styleType: 'text',
          show: true,
          size: 100,
          sortable: true
        },
      },

      voidCreditId: {
        sql: `${stg_pmsaccounting_deposit.voidCreditId}`,
        type: `string`
      },

      batchId: {
        sql: `${stg_pmsaccounting_deposit.batchId}`,
        type: `string`,
        title: 'Batch number',
        meta: {
          styleType: 'text',
          isGroupIdentifier: true,
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
        },
      },

      reference: {
        sql: `${stg_pmsaccounting_deposit.reference}`,
        type: `string`,
        title: 'Reference #',
        meta: {
          styleType: 'text',
          show: true,
          size: 175,
          sortable: true
        },
      },

      businessUnitId: {
        sql: `${stg_pmsaccounting_deposit.businessUnitId}`,
        type: `string`
      },

      bankId: {
        sql: `${stg_pmsaccounting_deposit.bankId}`,
        type: `string`,
        meta: {
            filterPosition: 'key'
          }
      },

      bankName: {
        sql: `${stg_pmsaccounting_deposit.bankName}`,
        type: `string`,
        title: 'Bank Name',
        meta: {
          styleType: 'text',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: false,
          filterPosition: 'label'
        }
      },

      payerId: {
        sql: `${CUBE}."PAYER_ID"`,
        type: `string`
      },

      paymentAmount: {
        sql: `${CUBE}."PAYMENT_AMOUNT"`,
        type: `string`
      },
      
      paymentMethodType: {
        sql: `${CUBE}."PAYMENT_METHOD_TYPE"`,
        type: `string`
      },
      
      depositId: {
        sql: `${CUBE}."DEPOSIT_ID"`,
        type: `string`,
        primaryKey: true
      },
      
      paymentCurrency: {
        sql: `${CUBE}."PAYMENT_CURRENCY"`,
        type: `string`
      },
      
      paymentId: {
        sql: `${CUBE}."PAYMENT_ID"`,
        type: `string`
      },
      
      accountId: {
        sql: `${CUBE}."ACCOUNT_ID"`,
        type: `string`
      },
      
      transactionId: {
        sql: `${CUBE}."TRANSACTION_ID"`,
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
      
      paymentDate: {
        sql: `${CUBE}."PAYMENT_DATE"`,
        type: `time`
      },

      paymentMonth: {
        sql: `date_trunc('MONTH', ${CUBE}."PAYMENT_DATE")`,
        type: `time`,
        title: 'Payment month',
        meta: {
          styleType: 'longDate',
          showOnHeaderBox: true,
          showLabelOnHeaderBox: false,
          show: false
        },
      }

    },
  
    segments: {
      voidCreditValid: {
        sql: `${CUBE.voidCreditId} is null`,
      },
    },

    dataSource: `snowflake_pms`
  });
  