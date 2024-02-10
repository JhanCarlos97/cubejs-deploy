cube(`bus_pms_checkRegister`, {
    sql: `SELECT * FROM ${raw_pmsaccounting_check.sql()}`,

  joins: {

    stg_pmsaccounting_apPayment: {
      sql: `${bus_pms_checkRegister}."AP_PAYMENT_ID"= ${stg_pmsaccounting_apPayment.apPaymentId}`,
      relationship: `belongsTo`}, 
     
    },  
    measures: {
      totalCount: {
        sql: `*`,
        type: `count`,
        title: `total count`
      },
      totalAmount: {
        sql: `${CUBE}."AMOUNT"`,
        type: `sum`,
        title: `Total Amount`,
        meta: {
          styleType: 'money'
        }
      }
    },
    dimensions: {  
      
      createdDate: {
        sql: `${CUBE}."CHECK_DATE"`,
        type: `time`,
        title: `Created date`,
        meta: {
          styleType: 'longDate',
          show: true,
          size: 98,
          sortable: true
          },      
        },       

    community: {
        sql: `${stg_pmsaccounting_apPayment.community}`,                
        type: `string`,
        title: `Community`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 324,
          sortable: true
          }            
        },    

    number: {
          sql: `${CUBE}."CHECK_NO"`,
          type: `string`,
          title: `Number`,
          meta: {
            styleType: 'textLeft',
            show: true,
            size: 115,
            sortable: true
          }       
          }, 
          
    amount: {
            sql: `${CUBE}."AMOUNT"`,
            type: `number`,
            title: `Balance`,
            meta: {
              styleType: 'money',
              show: true,
              size: 115,
              sortable: true
            }       
            },       

    status: {
              sql: `${CUBE}."STATUS"`,
              type: `string`,
              title: `Status`,
              meta: {
                styleType: 'textLeft',
                show: true,
                size: 115,
                filterPosition: "key,label"
              }       
              },

    vendor: {
              sql: `${CUBE}."PAYEE_NAME"`,
              type: `string`,
              title: `Vendor`,
              meta: {
                styleType: 'textLeft',
                show: true,
                size: 324,
                sortable: true
              }
            },  
    bankAccountId: {
              sql: `${stg_pmsaccounting_apPayment.bankAccountId}`,
              type: `string`,
              title: `Bank Account`,
              meta: {
                styleType: 'textLeft',
                show: true,
                size: 452,
                sortable: true,
                filterPosition: "key"
              }            
            },     
            
      bankAccountName: {
              sql: `${stg_pmsaccounting_apPayment.bankName}`,
              type: `string`,
              title: `Bank Account`,
              meta: {
                styleType: 'textLeft',
                show: true,
                size: 452,
                sortable: true,
                filterPosition: "label"
              }            
            },  

     businessUnitId: {
        sql: `${stg_pmsaccounting_apPayment.businessUnitId}`,
        type: `string` ,
        title: `Community id`,
        meta: {
          show: false
        }
        },
      
    customerId: {
          sql: `${stg_pmsaccounting_apPayment.customerId}`,
          type: `string`,
          title: `Customer id`,
          meta: {
            show: false
          }       
        },     

    pkApPaymentId: {
          sql: `${CUBE}."CHECK_ID"`,
          type: `string`,
          title: `Vendor`,
          meta: {
            styleType: 'textLeft',
            show: false,
            size: 324,
            sortable: true
          },
          primaryKey: true
        },  
        

  },
    dataSource: `snowflake_pms`
 
  });
