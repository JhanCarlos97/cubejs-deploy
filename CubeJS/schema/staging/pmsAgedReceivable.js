cube(`stg_pms_creditItemsSum`, {
    sql: `
    SELECT 
        bill_id, 
        SUM(ci.amount) AS credit_amount
    FROM ${raw_pmsaccounting_creditItem.sql()} ci 
    LEFT JOIN ${stg_pmsaccounting_voidCreditItem.sql()} vci ON vci.credit_item_id = ci.credit_item_id
    WHERE
        vci.void_credit_item_id IS NULL
    GROUP BY 1`,

      dataSource: `snowflake_pms`
    });

cube(`stg_pms_accountBills`, {
    sql: `
	SELECT 
        c.account_id, 
		b.customer_id, 
  		b.business_unit_id,
		b.bill_id, 
		b.post_date,
		SUM(bi.amount) AS bill_items_sum,
        SUM(ci.credit_amount) AS credit_items_sum
	FROM ${raw_pmsaccounting_charge.sql()} c 
	LEFT JOIN ${raw_pmsaccounting_billItem.sql()} bi ON bi.bill_item_id = c.bill_item_id
	LEFT JOIN ${raw_pmsaccounting_bill.sql()} b ON b.bill_id = bi.bill_id
    LEFT JOIN ${stg_pms_creditItemsSum.sql()} ci ON b.bill_id = ci.bill_id
    WHERE 
        ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `b.post_date <= ${value}`)}
        AND ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `b.post_date <= ${value}`)}
	GROUP BY 
        c.account_id, 
        b.customer_id, 
        b.business_unit_id,
        b.bill_id, 
        b.post_date`,
    dataSource: `snowflake_pms`
    });

cube(`stg_pms_accountUnpaidCharges`, {
    sql: `
    SELECT 
        account_id, 
        customer_id, 
        business_unit_id,
        date_trunc('day', post_date) AS post_date,
        '' as ar_notes,
        count(*) over (partition by account_id, customer_id, business_unit_id) count_by_account_id,
        COALESCE(SUM(bill_items_sum), 0) - COALESCE(SUM(credit_items_sum), 0) AS unpaid_amount
    FROM ${stg_pms_accountBills.sql()}
    GROUP BY 
        account_id, 
        customer_id, 
        business_unit_id, 
        date_trunc('day', post_date)`,

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
        
            businessUnitId: {
                sql: `${CUBE}.business_unit_id`,
                type: `string`,
                primaryKey: true,
                shown: true
            },

            postDate: {
                sql: `${CUBE}.post_date`,
                type: `time`,
            },

            countAccountId: {
                sql: `${CUBE}.count_by_account_id`,
                type: `number`,
            },
        
            unpaidAmount: {
                sql: `${CUBE}.unpaid_amount`,
                type: `number`,
            },
                
            },
        
        
            dataSource: `snowflake_pms`
            });

    cube(`stg_pms_accountUnpaidChargesAgg`, {
        sql: `
        SELECT 
            account_id, 
            customer_id, 
            business_unit_id,
            COALESCE(SUM(bill_items_sum), 0) - COALESCE(SUM(credit_items_sum), 0) AS unpaid_amount
        FROM ${stg_pms_accountBills.sql()}
        GROUP BY 
            account_id, 
            customer_id, 
            business_unit_id`,
    
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
    
        businessUnitId: {
            sql: `${CUBE}.business_unit_id`,
            type: `string`,
            primaryKey: true,
            shown: true
        },
    
        unpaidAmountAgg: {
            sql: `${CUBE}.unpaid_amount`,
            type: `number`,
        },
            
            },
    
    
        dataSource: `snowflake_pms`
        });

cube(`stg_pms_accountPrepaidAmount`, {
    sql: `
    SELECT 
        e.account_id, 
        SUM(COALESCE(le.amount, 0)) AS prepaid_amount
	FROM ${raw_pmsaccounting_entity.sql()} e 
	LEFT JOIN ${raw_pmsaccounting_glAccountSettings.sql()} gas ON gas.business_unit_id = e.business_unit_id
	LEFT JOIN ${raw_pmsaccounting_ledgerEntry.sql()} le ON le.credit_account = e.account_id  AND le.credit_gl = gas.prepaid
    WHERE 
        ${FILTER_PARAMS.bus_pms_agedReceivable.postDate.filter((from, value) => `le.post_date <= ${value}`)}
	GROUP BY e.account_id `,

    dimensions: {
        accountId: {
          sql: `${CUBE}.account_id`,
          type: `string`,
          primaryKey: true,
          shown: true
        },

        prepaidAmountAgg: {
            sql: `coalesce(${CUBE}.prepaid_amount,0)`,
            type: `number`,
            title: `prepays`,
            meta: {
                styleType: 'money',
                show: true,
                size: 106,
                group: 6,
                sortable: true
            }
        },
        
      },
      
    dataSource: `snowflake_pms`
    });

cube(`stg_pms_accountUnpaidChargesAggGlobal`, {
    sql: `
    SELECT 
        business_unit_id,
        COALESCE(SUM(bill_items_sum), 0) - COALESCE(SUM(credit_items_sum), 0) AS unpaid_amount
    FROM ${stg_pms_accountBills.sql()}
    GROUP BY
        business_unit_id`,

    dimensions: {

    businessUnitId: {
        sql: `${CUBE}.business_unit_id`,
        type: `string`,
        primaryKey: true,
        shown: true
    },

    unpaidAmountAgg: {
        sql: `${CUBE}.unpaid_amount`,
        type: `number`,
    },
    
},


    dataSource: `snowflake_pms`
    });

cube(`stg_pms_accountPrepaidAmountGlobal`, {
    sql: `
    SELECT 
        e.business_unit_id, 
        SUM(COALESCE(le.amount, 0)) AS prepaid_amount
    FROM ${raw_pmsaccounting_entity.sql()} e 
    LEFT JOIN ${raw_pmsaccounting_glAccountSettings.sql()} gas ON gas.business_unit_id = e.business_unit_id
    LEFT JOIN ${raw_pmsaccounting_ledgerEntry.sql()} le ON le.credit_account = e.account_id  AND le.credit_gl = gas.prepaid
    WHERE 
        ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `le.post_date <= ${value}`)}
    GROUP BY e.business_unit_id `,

    dimensions: {
        businessUnitId: {
            sql: `${CUBE}.business_unit_id`,
            type: `string`,
            primaryKey: true,
            shown: true
        },

        prepaidAmountAgg: {
            sql: `${CUBE}.prepaid_amount`,
            type: `number`,
            title: `prepays`,
            meta: {
                styleType: 'money',
                show: true,
                size: 106,
                group: 6,
                sortable: true
            }
        },
        
        },
        
    dataSource: `snowflake_pms`
    });

    cube(`stg_pms_billedOver500Global`, {
        sql: `
        SELECT 
            business_unit_id,
            sum(CASE WHEN current_month_plus_500 > 0 THEN 1 ELSE 0 END) current_month_plus_500,
            sum(CASE WHEN previous_month_plus_500 > 0 THEN 1 ELSE 0 END) previous_month_plus_500,
            sum(CASE WHEN prior_previous_month_plus_500 > 0 THEN 1 ELSE 0 END) prior_previous_month_plus_500
        FROM (
            SELECT
                business_unit_id,
                COALESCE(SUM(CASE 
                        WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', post_date) = date_trunc('month', ${value}:: timestamp)`)}
                        THEN bill_items_sum
                        ELSE 0 
                    END), 0) current_month_plus_500,
                COALESCE(SUM(CASE 
                        WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', post_date) = date_trunc('month', ${value}:: timestamp) - INTERVAL '1 month'`)}
                        THEN bill_items_sum
                        ELSE 0 
                    END), 0) previous_month_plus_500,
                COALESCE(SUM(CASE 
                        WHEN ${FILTER_PARAMS.bus_pms_agedReceivableGlobal.postDate.filter((from, value) => `date_trunc('day', post_date) = date_trunc('month', ${value}:: timestamp) - INTERVAL '2 month'`)}
                        THEN bill_items_sum
                        ELSE 0 
                    END), 0) prior_previous_month_plus_500
            FROM ${stg_pms_accountBills.sql()}
            GROUP BY business_unit_id
            HAVING sum(bill_items_sum) > 500
        )
        GROUP BY business_unit_id`,

        dimensions: {
            businessUnitId: {
                sql: `${CUBE}.business_unit_id`,
                type: `string`,
                primaryKey: true,
                shown: true
            },

            currentMonthPlus500: {
                sql: `${CUBE}.current_month_plus_500`,
                type: `number`
            },

            previousMonthPlus500: {
                sql: `${CUBE}.previous_month_plus_500`,
                type: `number`
            },

            priorPreviousMonthPlus500: {
                sql: `${CUBE}.prior_previous_month_plus_500`,
                type: `number`
            },
            
            },

        dataSource: `snowflake_pms`
        });