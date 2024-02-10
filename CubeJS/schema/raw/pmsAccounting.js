cube(`raw_pmsaccounting_temporaryLateFees`, {   sql: `SELECT * FROM "PMSACCOUNTING"."TEMPORARY_LATE_FEES"`});
cube(`raw_pmsaccounting_vendorTax`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_TAX"`});
cube(`raw_pmsaccounting_apPaymentItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."AP_PAYMENT_ITEM"`});
cube(`raw_pmsaccounting_vendor`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR"`,

dimensions: {
    vendorName: {
        sql: `VENDOR_NAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms` } );
cube(`raw_pmsaccounting_communityWorkingHours`, {   sql: `SELECT * FROM "PMSACCOUNTING"."COMMUNITY_WORKING_HOURS"`});
cube(`raw_pmsaccounting_codesChartAccounts`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CODES_CHART_ACCOUNTS"`});
cube(`raw_pmsaccounting_communityManagementAgents`, {   sql: `SELECT * FROM "PMSACCOUNTING"."COMMUNITY_MANAGEMENT_AGENTS"`});
cube(`raw_pmsaccounting_migrations`, {   sql: `SELECT * FROM "PMSACCOUNTING"."MIGRATIONS"`});
cube(`raw_pmsaccounting_creditItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CREDIT_ITEM"`});
cube(`raw_pmsaccounting_userRoles`, {   sql: `SELECT * FROM "PMSACCOUNTING"."USER_ROLES"`});
cube(`raw_pmsaccounting_reconciliationItemLedgerEntry`, {   sql: `SELECT * FROM "PMSACCOUNTING"."RECONCILIATION_ITEM_LEDGER_ENTRY"`});
cube(`raw_pmsaccounting_billItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."BILL_ITEM"`});
cube(`raw_pmsaccounting_voidCredit`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VOID_CREDIT"`,

dimensions: {

    voidCreditId: {
        sql: `VOID_CREDIT_ID`,
        type: `string`,
    },

    creditId: {
        sql: `CREDIT_ID`,
        type: `string`,
    },
},


dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_code`, {sql: `SELECT * FROM "PMSACCOUNTING"."CODE"`, 
dimensions: {
    chargeCodeName: {
        sql: `${CUBE}."NAME"`,
        type: `string`
    },
    businessUnitId: {
        sql: `${CUBE}."COMMUNITY_ID"`,
        type: `string`
    }
},
dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_ledgerEntry`, {   sql: `SELECT * FROM "PMSACCOUNTING"."LEDGER_ENTRY"`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_invoiceAttachment`, {   sql: `SELECT * FROM "PMSACCOUNTING"."INVOICE_ATTACHMENT"`});
cube(`raw_pmsaccounting_reconciliation`, {   sql: `SELECT * FROM "PMSACCOUNTING"."RECONCILIATION"`});
cube(`raw_pmsaccounting_identities`, {   sql: `SELECT * FROM "PMSACCOUNTING"."IDENTITIES"`});
cube(`raw_pmsaccounting_glAccount`, {   sql: `SELECT * FROM "PMSACCOUNTING"."GL_ACCOUNT"`,

dimensions: {

    voidCreditId: {
        sql: `VOID_CREDIT_ID`,
        type: `string`,
    },

    creditId: {
        sql: `CREDIT_ID`,
        type: `string`,
    },

    glName: {
        sql: `GL_NAME`,
        type: `string`,
    },

    glNumber: {
        sql: `GL_NUMBER`,
        type: `string`,
    },

    glAccountId: {
        sql: `GL_ACCOUNT_ID`,
        type: `string`,
    },
},


dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_charge`, {   sql: `SELECT ch.NOTES, ch.AMOUNT, ch.STATUS, ch.BIND_ID, ch.CODE_ID,
                                    convert_timezone('UTC', com.timezone_id, TO_TIMESTAMP_NTZ(ch.DUE_DATE)) AS DUE_DATE,
                                    ch.CHARGE_ID,
                                    convert_timezone('UTC', com.timezone_id, TO_TIMESTAMP_NTZ(ch.POST_DATE)) AS POST_DATE, ch.REFERENCE,
                                    ch.ACCOUNT_ID, ch.CREATED_AT, ch.CREATED_BY, ch.DELETED_AT, ch.DELETED_BY, ch.UPDATED_AT, ch.UPDATED_BY, ch.BILL_ITEM_ID
                                    FROM "PMSACCOUNTING"."CHARGE" ch
                                    LEFT JOIN "PMSACCOUNTING"."CODE" c ON c.id = ch.code_id
                                    left join "PMSAUTH"."COMMUNITIES" com on c.community_id = com.id`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_paymentStatus`, {   sql: `SELECT * FROM "PMSACCOUNTING"."PAYMENT_STATUS"`});
cube(`raw_pmsaccounting_customerUsers`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CUSTOMER_USERS"`});
cube(`raw_pmsaccounting_periodBalanceChartOfAccount`, {   sql: `SELECT * FROM "PMSACCOUNTING"."PERIOD_BALANCE_CHART_OF_ACCOUNT"`});
cube(`raw_pmsaccounting_glAccountType`, {   sql: `SELECT * FROM "PMSACCOUNTING"."GL_ACCOUNT_TYPE"`,

dimensions: {
    glTypeName: {
        sql: `GL_TYPE_NAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_deposit`, {   sql: `SELECT * FROM "PMSACCOUNTING"."DEPOSIT"`});
cube(`raw_pmsaccounting_invoiceItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."INVOICE_ITEM"`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_check`, {   sql: `select * from "PMSACCOUNTING"."check"`});
cube(`raw_pmsaccounting_reversalReasons`, {   sql: `SELECT * FROM "PMSACCOUNTING"."REVERSAL_REASONS"`});
cube(`raw_pmsaccounting_checkStatus`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CHECK_STATUS"`});
cube(`raw_pmsaccounting_invoice`, {   sql: `SELECT * FROM "PMSACCOUNTING"."INVOICE"`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_invoicePayees`, { sql: `SELECT * FROM "PMSACCOUNTING"."INVOICE_PAYEES"`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_userRolesPermissions`, {   sql: `SELECT * FROM "PMSACCOUNTING"."USER_ROLES_PERMISSIONS"`});
cube(`raw_pmsaccounting_periodBalanceAccount`, {   sql: `SELECT * FROM "PMSACCOUNTING"."PERIOD_BALANCE_ACCOUNT"`});
cube(`raw_pmsaccounting_bankAccounts`, {   sql: `SELECT * FROM "PMSACCOUNTING"."BANK_ACCOUNTS"`,

dimensions: {
    bankName: {
        sql: `BANK_NAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_states`, {   sql: `SELECT * FROM "PMSACCOUNTING"."STATES"`});
cube(`raw_pmsaccounting_aclConfigs`, {   sql: `SELECT * FROM "PMSACCOUNTING"."ACL_CONFIGS"`});
cube(`raw_pmsaccounting_apPayment`, {   sql: `SELECT * FROM "PMSACCOUNTING"."AP_PAYMENT"`});
cube(`raw_pmsaccounting_temporaryLateFeesBusinessUnits`, {   sql: `SELECT * FROM "PMSACCOUNTING"."TEMPORARY_LATE_FEES_BUSINESS_UNITS"`});
cube(`raw_pmsaccounting_invoiceMetadata`, {   sql: `SELECT * FROM "PMSACCOUNTING"."INVOICE_METADATA"`});
cube(`raw_pmsaccounting_voidBillItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VOID_BILL_ITEM"`});
cube(`raw_pmsaccounting_customers`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CUSTOMERS"`});
cube(`raw_pmsaccounting_vendorAttachment`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_ATTACHMENT"`});
cube(`raw_pmsaccounting_bankStatementItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."BANK_STATEMENT_ITEM"`});
cube(`raw_pmsaccounting_nsfSetting`, {   sql: `SELECT * FROM "PMSACCOUNTING"."NSF_SETTING"`});
cube(`raw_pmsaccounting_communityAddresses`, {   sql: `SELECT * FROM "PMSACCOUNTING"."COMMUNITY_ADDRESSES"`});
cube(`raw_pmsaccounting_vendorBusinessUnit`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_BUSINESS_UNIT"`});
cube(`raw_pmsaccounting_reconciliationItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."RECONCILIATION_ITEM"`});
cube(`raw_pmsaccounting_communities`, {   sql: `SELECT * FROM "PMSACCOUNTING"."COMMUNITIES"`,

dimensions: {
    name: {
        sql: `name`,
        type: `string`,
    },

    communityId: {
        sql: `community_id`,
        type: `string`,
    },

    customerId: {
        sql: `customer_id`,
        type: `string`,
    },

    community: {
        sql: `NAME`,
        type: `string`,
    },
},

dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_userPermissions`, {   sql: `SELECT * FROM "PMSACCOUNTING"."USER_PERMISSIONS"`});
cube(`raw_pmsaccounting_vendorContact`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_CONTACT"`});
cube(`raw_pmsaccounting_voidCreditItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VOID_CREDIT_ITEM"`});
cube(`raw_pmsaccounting_businessUnit`, {   sql: `SELECT * FROM "PMSACCOUNTING"."BUSINESS_UNIT"`});
cube(`raw_pmsaccounting_apPaymentStatus`, {   sql: `SELECT * FROM "PMSACCOUNTING"."AP_PAYMENT_STATUS"`});
cube(`raw_pmsaccounting_glAccountSettings`, {   sql: `SELECT * FROM "PMSACCOUNTING"."GL_ACCOUNT_SETTINGS"`});
cube(`raw_pmsaccounting_credit`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CREDIT"`});
cube(`raw_pmsaccounting_attachment`, {   sql: `SELECT * FROM "PMSACCOUNTING"."ATTACHMENT"`});
cube(`raw_pmsaccounting_bill`, {   sql: `select
                                    b.AMOUNT, b.BILL_ID,
                                    convert_timezone('UTC', com.timezone_id, TO_TIMESTAMP_NTZ(b.POST_DATE)) POST_DATE,
                                    b.CUSTOMER_ID, b.CREATED_DATE, b.UPDATED_DATE, b.BUSINESS_UNIT_ID
                                    from "PMSACCOUNTING"."BILL" b
                                    left join "PMSAUTH"."COMMUNITIES" com on b.business_unit_id = com.id`});
cube(`raw_pmsaccounting_notificationMetadata`, {   sql: `SELECT * FROM "PMSACCOUNTING"."NOTIFICATION_METADATA"`});
cube(`raw_pmsaccounting_vendorInsurance`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_INSURANCE"`});
cube(`raw_pmsaccounting_businessUnitSettings`, {   sql: `SELECT * FROM "PMSACCOUNTING"."BUSINESS_UNIT_SETTINGS"`});
cube(`raw_pmsaccounting_industry`, {   sql: `SELECT * FROM "PMSACCOUNTING"."INDUSTRY"`});
cube(`raw_pmsaccounting_vendorContract`, {   sql: `SELECT * FROM "PMSACCOUNTING"."VENDOR_CONTRACT"`});
cube(`raw_pmsaccounting_lateFeeSchema`, {   sql: `SELECT * FROM "PMSACCOUNTING"."LATE_FEE_SCHEMA"`});
cube(`raw_pmsaccounting_payment`, {   sql: `select
                                    p.STATUS, p.ACCOUNT_ID, p.CREATED_AT, p.DEPOSIT_ID, p.PAYMENT_ID, p.UPDATED_AT,
                                    convert_timezone('UTC', com.timezone_id, TO_TIMESTAMP_NTZ(p.PAYMENT_DATE)) AS PAYMENT_DATE,
                                    p.ACCRUAL_AMOUNT, p.PAYMENT_AMOUNT, p.TRANSACTION_ID, p.PAYMENT_CURRENCY, p.PAYMENT_METHOD_TYPE, p.PAYER_ID
                                    FROM "PMSACCOUNTING"."PAYMENT" p
                                    LEFT JOIN "PMSACCOUNTING"."DEPOSIT" d ON d.deposit_id = p.deposit_id
                                    left join "PMSAUTH"."COMMUNITIES" com on d.business_unit_id = com.id`});
cube(`raw_pmsaccounting_notification`, {   sql: `SELECT * FROM "PMSACCOUNTING"."NOTIFICATION"`});
cube(`raw_pmsaccounting_codeCategory`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CODE_CATEGORY"`, 
dimensions: {
    
    id: {
        sql: `ID`,
        type: `string`,
    },
    
    codeCategoryName: {
        sql: `name`,
        type: `string`,
    },
},
dataSource: `snowflake_pms`});

cube(`raw_pmsaccounting_entity`, {   sql: `SELECT * FROM "PMSACCOUNTING"."ENTITY"`, dataSource: `snowflake_pms`});
cube(`raw_pmsaccounting_reconciliationItemBankStatementItem`, {   sql: `SELECT * FROM "PMSACCOUNTING"."RECONCILIATION_ITEM_BANK_STATEMENT_ITEM"`});
cube(`raw_pmsaccounting_notificationRecipient`, {   sql: `SELECT * FROM "PMSACCOUNTING"."NOTIFICATION_RECIPIENT"`});
cube(`raw_pmsaccounting_chartOfAccountBalance`, {   sql: `SELECT * FROM "PMSACCOUNTING"."CHART_OF_ACCOUNT_BALANCE"`, dataSource: `snowflake_pms`});

