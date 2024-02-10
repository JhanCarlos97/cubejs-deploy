cube(`bus_pms_residentLedger`, {
  sql: `WITH lease AS (
    ${ stg_pms_leasingData.sql() }
    ), ld AS (
        SELECT listagg(DISTINCT lease.residentName, ', ') WITHIN
        GROUP (
            ORDER BY lease.residentName
            ) resident
          ,occupancyId
          ,unit
        FROM lease
        GROUP BY occupancyId, unit
    ), order_balance_id AS (
    SELECT *
           ,ROW_NUMBER() OVER (ORDER BY post_date ASC) AS row_id
    FROM ${ stg_pms_residentEntries.sql() }
    )
  SELECT re.account_id as account_id
         ,re.business_unit_id as business_unit_id
         ,re.post_date as post_date
         ,re.code as code
         ,re.reference as reference
         ,re.credit as credit
         ,re.charge as charge
        ,ld.unit AS unit
        ,ld.resident
        ,COALESCE(SUM(COALESCE(- credit, charge)) OVER (PARTITION BY account_id ORDER BY row_id DESC ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING), 0) AS balance
      FROM order_balance_id re
      LEFT JOIN ld ON re.account_id = ld.occupancyId
      WHERE ${ FILTER_PARAMS.bus_pms_residentLedger.accountId.filter((value) => `account_id = ${ value}`) }
        AND ${ FILTER_PARAMS.bus_pms_residentLedger.reference.filter((value) => `reference = ${ value}`) }
          GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, row_id 
            `,
  
  dimensions: {
    credit: {
      sql: `iff (${CUBE}.credit is null,0, ${CUBE}.credit)`,
      type: `number`,
      title: `Credit`,
      meta: {
        styleType: 'money',
        show: true,
        size: 135,
        sortable: true
      }
    },
    charge: {
      sql: `iff (${CUBE}.charge is null,0, ${CUBE}.charge)`,
      type: `number`,
      title: `Charge`,
      meta: {
        styleType: 'money',
        show: true,
        size: 135,
        sortable: true
      }
    },
       balance: {
      sql: `iff (${CUBE}.balance is null,0, ${CUBE}.balance)`,
      type: `number`,
      title: `Balance`,
      meta: {
        styleType: 'money',
        show: true,
        size: 135,
        sortable: true
      }
    },

    date: {
      sql: `${CUBE}."POST_DATE"`,
      type: `time`,
      title: `Date`,
      meta: {
        styleType: 'longDate',
        show: true,
        size: 106,
        sortable: true
      }
    },

    businessUnitId: {
      sql: `${CUBE}.business_Unit_Id`,
      type: `string`,
      meta: {
        show: false
      }
    },

    resident: {
      sql: `${CUBE}.resident`,
      type: `string`,
      title: `Resident`,
      meta: {
        styleType: 'textLeft',
        clickable: false,
        show: false,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: true,
        colorStyle: "DEFAULT"
      }
    },

    code: {
      sql: `${CUBE}."CODE"`,
      type: `string`,
      title: `Charge code`,
      meta: {
        styleType: 'textLeft',
        show: true,
        size: 452,
        sortable: true
      }
    },

    reference: {
      sql: `${CUBE}."REFERENCE"`,
      type: `string`,
      title: `Reference`,
      meta: {
        styleType: 'textLeft',
        show: true,
        size: 135,
        sortable: true
      }
    },

    unit: {
      sql: `${CUBE}.unit`,
      type: `string`,
      title: `Unit`,
      meta: {
        styleType: 'textLeft',
        clickable: false,
        show: false,
        showOnHeaderBox: true,
        showLabelOnHeaderBox: false,
        isGroupIdentifier: false,
        colorStyle: "GRAY",
        filterPosition: "key,label"
      }
    },
    accountId: {
      sql: `${CUBE}.account_id`,
      type: `string`      
    }

  },

  dataSource: `snowflake_pms`
});
