cube(`bus_pmsIncomeStatement`, {
    sql: `${raw_pmsaccounting_ledgerEntry.sql()}`,

    joins: {
      stg_pms_glParentChild: {
        sql: `(${bus_pmsIncomeStatement}."DEBIT_GL" = ${stg_pms_glParentChild.glChildId} and ${bus_pmsIncomeStatement}."BUSINESS_UNIT_ID" = ${stg_pms_glParentChild.businessUnitId})
             OR
             (${bus_pmsIncomeStatement}."CREDIT_GL" = ${stg_pms_glParentChild.glChildId} and ${bus_pmsIncomeStatement}."BUSINESS_UNIT_ID" = ${stg_pms_glParentChild.businessUnitId})`,
        relationship: `belongsTo`
        }   

      },

      measures: {     

        amount: {
          sql: `case when ${CUBE}."DEBIT_GL" is null then ${CUBE}.AMOUNT *-1 else ${CUBE}.AMOUNT end`,
          type: `sum`,
          title: `Total Amount`,
          meta: {
            styleType: 'money',
            show: false,
            size: 180,
            isTransposeValue: true,
            isGroupTotalizedValue: true,
            sortable: true
          }
        },

        totalAmount: {
          sql: `sum( ${amount}) over (partition by ${stg_pms_glParentChild.glParentName})`,
          type: `number`,
          title: `Amount`,
          meta: {
            styleType: 'text',
            show: true,
            size: 94,
            sortable: true
          }
        },
      },
   
    dimensions: {

      glTypeName: {
        sql: `${stg_pms_glParentChild.glTypeName}`,
        type: `string`,
        title: `Category`,
        meta: {
          styleType: 'text',
          show: false,
          showOnHeaderBox: true,
          showLabelOnHeaderBox: true,
          isGroupIdentifier: true
        }
      },  

      glParentName: {
        sql: `${stg_pms_glParentChild.glParentName}`,
        type: `string`,
        title: `G/L parent`,
        meta: {
          styleType: 'text',
          show: false,
          size: 249,
          isGroupTotalizedParent: true
        }
      },  

      gl: {
        sql: `${stg_pms_glParentChild.glChildNumber} || ' '  || ${stg_pms_glParentChild.glParentName}`,
        type: `string`,
        primaryKey: true,
        title: `g/l account`,
        shown: true,
        meta: {
            styleType: 'text',
            show: true,
            transposeUnifier: true        
          }
      },

      period: {
        sql: `TO_VARCHAR(${CUBE}."POST_DATE", 'yyyy-MM')`,
        type: `string`,
        title: `Period`,
        meta: {
          styleType: 'SHORTDATE_NUMERIC',
          show: false,
          isTransposeKey: true
        }
      
      },

      postDate: {
        sql: `${CUBE}."POST_DATE"`,
        type: `string`,
        meta: {          
          show: false
        }
      
      },


      businessUnitId: {
        sql: `${CUBE}."BUSINESS_UNIT_ID"`,
        type: `string`,
        meta: {          
          show: false
        }
      
      },
}, 

segments: {
  PMR21: {
      sql: `${stg_pms_glParentChild.glTypeName}='Income' or ${stg_pms_glParentChild.glTypeName}='Expenses'`
  }
},
    dataSource: `snowflake_pms`
});
