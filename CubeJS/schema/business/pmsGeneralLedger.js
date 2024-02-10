cube(`bus_pms_generalLedger`, {
  sql: `
  with txs as (
    select 
    1 as QTY,
    ga.GL_ACCOUNT_ID GL_ACCOUNT_ID,
    case when le.DEBIT_GL is null then le.AMOUNT*-1 else le.AMOUNT end as CHANGE,
    case when le.DEBIT_GL is null then 0 else le.AMOUNT end as DEBIT_AMOUNT, 
    case when le.CREDIT_GL is null then 0 else le.AMOUNT end as CREDIT_AMOUNT,
    le.post_date as POST_DATE,
    le.description as DESCRIPTION,
    ga.gl_type
    from ${raw_pmsaccounting_ledgerEntry.sql()} AS le
      inner JOIN ${raw_pmsaccounting_glAccount.sql()} AS ga ON le.DEBIT_GL = ga.GL_ACCOUNT_ID or le.CREDIT_GL= ga.GL_ACCOUNT_ID
      WHERE (${FILTER_PARAMS.bus_pms_generalLedger.businessUnitId.filter((value) => `le.BUSINESS_UNIT_ID = ${value}`)}) 
        AND (${FILTER_PARAMS.bus_pms_generalLedger.accountNumberGTE.filter((value) => `ga.GL_NUMBER >= ${value}`)})  
        AND (${FILTER_PARAMS.bus_pms_generalLedger.accountNumberLTE.filter((value) => `ga.GL_NUMBER <= ${value}`)}) 
        AND (${FILTER_PARAMS.bus_pms_generalLedger.transactionDate.filter((from, to) => `le.POST_DATE >= ${from}::timestamp_tz AND le.POST_DATE <= ${to}::timestamp_tz`)})
  ),
  
  balance as (
      select 
      gabal.gl_account_id as GL_ACCOUNT_ID,
      sum(case when lebal.DEBIT_GL is null then lebal.AMOUNT*-1 else lebal.AMOUNT end) as STARTING
      from 
      ${raw_pmsaccounting_ledgerEntry.sql()} lebal
      LEFT JOIN ${raw_pmsaccounting_glAccount.sql()} AS gabal 
        ON lebal.DEBIT_GL = gabal.GL_ACCOUNT_ID or lebal.CREDIT_GL= gabal.GL_ACCOUNT_ID
      where ${FILTER_PARAMS.bus_pms_generalLedger.businessUnitId.filter((value) => `lebal.BUSINESS_UNIT_ID = ${value}`)}
      and ${FILTER_PARAMS.bus_pms_generalLedger.transactionDate.filter((from) => `lebal.POST_DATE < ${from}::timestamp_tz`)}
      group by 
      gabal.gl_account_id    
          ) 
  
  SELECT
    gl.BUSINESS_UNIT_ID,
    gl.gl_number as ACCOUNT_NUMBER, 
    gl.gl_name as ACCOUNT_NAME,
    sum(qty) over (partition by gl.gl_number) as TRANSACTIONS,
    nvl(balance.starting,0) as STARTING,
    sum(nvl(change,0)) over (partition by gl.gl_number) as CHANGE, 
    nvl(balance.starting,0) + sum(nvl(change,0)) over (partition by gl.gl_number) as BALANCE, 
    sum(nvl(debit_amount,0)) over (partition by gl.gl_number) as DEBITS, 
    sum(nvl(credit_amount,0)) over (partition by gl.gl_number) as CREDITS,
    txs.post_date as POST_DATE,
    txs.description as DESCRIPTION,
    nvl(debit_amount,0) as DEBIT,
    nvl(credit_amount,0) as CREDIT,
    txs.gl_type,
    sum(nvl(change,0)) over (partition by txs.gl_type) as TOTAL_BY_TYPE
  FROM txs
      left join balance on txs.GL_ACCOUNT_ID = balance.GL_ACCOUNT_ID
      LEFT JOIN ${raw_pmsaccounting_glAccount.sql()} AS gl ON gl.GL_ACCOUNT_ID = txs.GL_ACCOUNT_ID
  ORDER BY 1 ASC, 2 asc, 9 asc`,

  measures: {
    
    totalDebits: {
      sql: `${CUBE}."DEBIT"`,                 
      type: `sum`,
      title: `total debits`,
      meta: {
        styleType: 'money',
        show: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true
      }
    },
    totalCredits: {
      sql: `${CUBE}."CREDIT"`,                 
      type: `sum`,
      title: `total credits`,
      meta: {
        styleType: 'money',
        show: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true
      }
    }, 
    difference: {
      sql: `${CUBE}."DEBIT" - ${CUBE}."CREDIT"`,                 
      type: `sum`,
      title: `difference`,
      meta: {
        styleType: 'money',
        show: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true
      }
    },    
    
    totalAssets: {
      sql: `Case when ${CUBE}."GL_TYPE" = 1 THEN  ${CUBE}."CHANGE" ELSE 0 END`,                 
      type: `sum`,
      title: `total assests`,
      meta: {
        styleType: 'money',
        show: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true,
        layout: 'row'
      }
    },  
    
    totalLiabilitiesAndCapital: {
      sql: `Case when ${CUBE}."GL_TYPE" in (2,3) THEN  ${CUBE}."CHANGE" ELSE 0 END`,                 
      type: `sum`,
      title: `total liabilities and capital`,
      meta: {
        styleType: 'money',
        show: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true,
        layout: 'row'
      }
    }
    },

  dimensions: {

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
      type: `string`,
      title: `BusinessUnit`
    },

    accountNumber: {
        sql: `${CUBE}."ACCOUNT_NUMBER"`,                
        type: `string`,
        title: `Account number`,
        primaryKey: true,
        shown: true,
        meta: {
          styleType: 'textLeft',
          show: false,
          clickable: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          isGroupIdentifier: true,
          size: 162
        }
      },

    accountNumberPMR46: {
      sql: `${CUBE.accountNumber}`,                
      type: `string`,
      title: `Account number`,
      primaryKey: true,
      shown: true,
      meta: {
        styleType: 'textLeft',
        show: true,
        clickable: true,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: true,
        isGroupIdentifier: true,
        size: 162,
        sortable: true
      }
    },

    accountNumberPMR06: {
      sql: `${CUBE.accountNumber}`,                
      type: `string`,
      shown: true,
      title: `Account number`,
      primaryKey: true,
      meta: {
        styleType: 'textLeft',
        show: true,
        size: 162,
        sortable: true
      }
    },

    accountNumberGTE: {
      sql: `${CUBE}."ACCOUNT_NUMBER"`,                
      type: `string`,
      title: `Account number`,
      primaryKey: true,
      shown: true,
      meta: {
        filterPosition: 'key,label'
      }
    },

    accountNumberLTE: {
      sql: `${CUBE}."ACCOUNT_NUMBER"`,                
      type: `string`,
      title: `Account number`,
      primaryKey: true,
      shown: true,
      meta: {
        filterPosition: 'key,label'
      }
    },
        
      accountName: {
        sql: `${CUBE}."ACCOUNT_NAME"`,                 
        type: `string`,
        title: `Account name`,
        meta: {
          styleType: 'textLeft',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 389
        }
      },

      accountNamePMR46: {
        sql: `${CUBE.accountName}`,                 
        type: `string`,
        title: `Account name`,
        meta: {
          styleType: 'textLeft',
          show: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 389,
          sortable: true
        }
      },

      accountNamePMR06: {
        sql: `${CUBE.accountName}`,                 
        type: `string`,
        title: `Account name`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 800,
          sortable: true
        }
      },

      transactions: {
        sql: `${CUBE}."TRANSACTIONS"`,                 
        type: `string`,
        title: `Transactions`,
        meta: {
          styleType: 'textLeft',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },

      starting: {
        sql: `${CUBE}."STARTING"`,                 
        type: `string`,
        title: `Starting`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },

      balanceForward: {
        sql: `${CUBE.starting}`,                 
        type: `string`,
        title: `Balance forward`,
        meta: {
          styleType: 'money',
          show: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 162,
          sortable: true
        }
      },

      change: {
        sql: `${CUBE}."CHANGE"`,                 
        type: `string`,
        title: `Change`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },     

      balance: {
        sql: `${CUBE}."BALANCE"`,                 
        type: `string`,
        title: `Balance`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },

      endingBalance: {
        sql: `${CUBE.balance}`,                 
        type: `string`,
        title: `Ending Balance`,
        meta: {
          styleType: 'money',
          show: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true
        }
      },

      balancePMR06: {
        sql: `${CUBE.balance}`,                 
        type: `string`,
        title: `Ending Balance`,
        meta: {
          styleType: 'money',
          show: true,
          sortable: true,
          size: 160
        }
      },

      balanceToggle: {
        sql: `case when ${CUBE}."BALANCE" = 0 then true else false end`,                 
        type: `boolean`,
        title: `show $0 balance items`,
        meta: {
          show: false,
          styleType: 'check',
          toggleable: true,
          toggleTitle: "show $0 balance items" 
        }
      },

      debits: {
        sql: `${CUBE}."DEBITS"`,                 
        type: `string`,
        title: `Debits`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 135
        }
      },

      debitsPMR46: {
        sql: `${CUBE.debits}`,                 
        type: `string`,
        title: `Debits`,
        meta: {
          styleType: 'money',
          show: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 135
        }
      },

      credits: {
        sql: `${CUBE}."CREDITS"`,                 
        type: `string`,
        title: `Credits`,
        meta: {
          styleType: 'money',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 162
        }
      },

      creditsPMR46: {
        sql: `${CUBE.credits}`,                 
        type: `string`,
        title: `Credits`,
        meta: {
          styleType: 'money',
          show: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 162
        }
      },

    transactionDate: {
        sql: `${CUBE}."POST_DATE"`,                
        type: `time`,
        title: `Transaction date`,
        meta: {
          styleType: 'longDate',
          show: true,
          sortable: true,
          size: 140
        }
      } ,

      description: {
        sql: `${CUBE}."DESCRIPTION"`,                 
        type: `string`,
        title: `Description`,
        meta: {
          styleType: 'leftText',
          show: true,
          sortable: true,
          size: 600
        }
      },

      debit: {
        sql: `${CUBE}."DEBIT"`,                 
        type: `string`,
        title: `Debit`,
        meta: {
          styleType: 'money',
          show: true,
          sortable: true,
          size: 125
        }
      },

      credit: {
        sql: `${CUBE}."CREDIT"`,                 
        type: `string`,
        title: `Credit`,
        meta: {
          styleType: 'money',
          show: true,
          sortable: true,
          size: 125
        }
      },

      glType: {
        sql: `${CUBE}."GL_TYPE"`,                
        type: `string`,
        title: `gl type id`
      },

      glTypeName: {
        sql: `case when ${CUBE}."GL_TYPE" = 1 then 'Assets' when ${CUBE}."GL_TYPE"=2 then 'Liabilities' when ${CUBE}."GL_TYPE"=3 then 'Capital' else null end`,                
        type: `string`,
        title: `type`,
        meta: {
          styleType: 'leftText',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          isGroupIdentifier: true
        }
      },

      totalByType: {
        sql: `${CUBE}."TOTAL_BY_TYPE"`,                 
        type: `string`,
        title: `total`,
        meta: {
          styleType: 'money',
          show: false,
          isGroupTotal: true,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          size: 135
        }
      },

      totalByTypePMR06: {
        sql: `${CUBE.totalByType}`,                 
        type: `string`,
        title: `total`,
        meta: {
          styleType: 'money',
          show: false,
          isGroupTotal: true
        }
      },
},  

segments: {
  pmr06Segment: {
      sql: `${CUBE}."GL_TYPE" in (1,2,3)`
  }
},

  dataSource: `snowflake_pms`

});




