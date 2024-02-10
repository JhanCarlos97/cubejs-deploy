cube(`bus_pms_AgedAPDetailed`, {
    extends: stg_pmsaccounting_invoice,

  joins: {

    stg_pms_invoice_item: {
        sql: `${bus_pms_AgedAPDetailed.invoiceId}= ${stg_pms_invoice_item.invoiceId}`,
        relationship: `hasMany`},

    stg_pmsaccounting_invoicePayees:{
      sql: `${bus_pms_AgedAPDetailed}."PAYEE_ID" = ${stg_pmsaccounting_invoicePayees}."PAYEE_ID"`,
      relationship: `belongsTo`},
    
    },  
    
    measures: {
      count: {
        type: `count`,
        sql: `1`,        
        title: 'Invoice count',
        meta: {
          styleType: 'textLeft',
          show: true,
          sortable: true
        }
      },

      m030: {
        sql: `case when due_date BETWEEN date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '30 days' AND date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '1 millisecond'
        then invoice_amount else 0 end`,
        type: `sum`,        
        title: '0-30',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      m03060: {
        sql: `case when due_date BETWEEN date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '60 days'  AND date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '30 days' - INTERVAL '1 millisecond'
        then invoice_amount else 0 end`,
        type: `sum`,        
        title: '31-60',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      m6090: {
        sql: `case when due_date BETWEEN date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '90 days'  AND date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '60 days' - INTERVAL '1 millisecond'
        then invoice_amount else 0 end`,
        type: `sum`,        
        title: '61-90',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      m90plus: {
        sql: `case when due_date <= date_trunc('day', CURRENT_TIMESTAMP) - INTERVAL '90 days'
        then invoice_amount else 0 end`,
        type: `sum`,        
        title: '90+',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      amount: {
        sql: `${bus_pms_AgedAPDetailed}."INVOICE_AMOUNT"`,
        type: `sum`,        
        title: 'Amount',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },




    },
    dimensions: {      
      vendor: {
          sql: `${stg_pmsaccounting_invoicePayees.vendorName}`,
          type: `string`,        
          title: `Vendor`,
          meta: {
            styleType: 'textLeft',
            show: true,
            size: 253,
            sortable: true
          }
      },    

      invoiceAmount: {
        sql: `${bus_pms_AgedAPDetailed}."INVOICE_AMOUNT"`,
        type: `string`,        
        title: 'Invoice amount',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      invoiceLineItemAmount: {
        sql: `${stg_pms_invoice_item.invoiceItemAmount}`,
        type: `string`,        
        title: 'Invoice line item amount',
        meta: {
          styleType: 'money',
          show: true,
          sortable: true
        }
      },

      businessUnitId: {
        sql: `${CUBE}."BUSINESS_UNIT_ID"`,
        type: `string`       
        },
      creditId: {
        sql: `${stg_pms_invoice_item.creditId}`,
        type: `string`          
      },
      invoiceId: {
        sql: `${CUBE}."INVOICE_ID"`,
        type: `string`,
        primaryKey: true     
      },

      invoiceNumber: {
        sql: `${CUBE}."INVOICE_NUMBER"`,
        type: `string`,        
        title: `Invoice number`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 155,
          sortable: true
        }
      },

      invoiceDate: {
        sql: `${CUBE}."INVOICE_DATE"`,
        type: `time`,
        title: `Invoice date`,
        meta: {
          styleType: 'longDate',
          show: true,
          size: 130,
          sortable: true
        }
      },
      
      glAccount: {
        sql: `${stg_pms_invoice_item.glAccount}`,
        type: `string`,
        title: `G/L cash account`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 169,
          sortable: true
        }        
      },

      glAccountCode: {
        sql: `${stg_pms_invoice_item.glAccountCode}`,
        type: `string`,
        title: `Accounting code`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 169,
          sortable: true
        }        
      },

      invoiceItemDescription: {
        sql: `${stg_pms_invoice_item.invoiceItemDescription}`,
        type: `string`,
        title: `Invoice line item description`,
        meta: {
          styleType: 'textLeft',
          show: true,
          size: 248,
          sortable: true
        }        
      },

      invoiceItemId: {
        sql: `${stg_pms_invoice_item.invoiceItemId}`,
        type: `string`,
        title: `Invoice line item Id`
      },

      rehabItem: {
        sql: `${stg_pms_invoice_item.rehabItem}`,
        type: `string`,
        title: `Rehab item`,
        meta: {
          styleType: 'check',
          show: true,
          size: 102,
          toggleable: true,
          toggleTitle: "show rehab items"
        }        
      },
  },
    segments: {
      credit_check: {
        sql: `${stg_pms_invoice_item.creditId} IS NULL or (${stg_pms_invoice_item.creditId} IS NOT NULL and ${stg_pms_invoice_item.voidCreditId} IS NOT NULL)`,
      },
    },
    dataSource: `snowflake_pms`
 
  });
