cube(`bus_pms_onlinePaymentActivity`, {
    sql: `
    WITH occupancy_cte as (
      SELECT 
        occupancy.business_unit_id,
        occupancy.occupancy_id,
        occupancy.household_move_in_date,
        occupancy.start_date,
        ORE.SUBS_VALID_SPAN_LOWER AS lower_span,
        ORE.SUBS_VALID_SPAN_UPPER AS upper_span,
        occupancy.household_move_out_date,
        coalesce(occupancy.household_move_in_date, occupancy.start_date) move_in_date,
        LVIE.RENT_AMOUNT as LEASE_RENT,
        EP.PHONE_NUMBER,
        coalesce(occupancy_phase.occupancy_phase_type, 'Vacant') as UNIT_STATUS,
        u.c_unit_name as unit_name,
        listagg(distinct P.FULLNAME, ', ') WITHIN GROUP (ORDER BY P.FULLNAME) AS RESIDENT
      FROM ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase
      LEFT JOIN ${raw_pmsleasing_occupancy.sql()} AS occupancy ON occupancy_phase.occupancy_id = occupancy.occupancy_id     
      LEFT JOIN ${raw_pmsleasing_unit.sql()} U ON occupancy.unit_id = u.unit_id    
      LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} LVIE ON LVIE.OCCUPANCY_ID = occupancy_phase.occupancy_id AND LVIE.OCCUPANCY_PHASE_INDEX = occupancy_phase.occupancy_phase_index      
      LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} ORE ON ORE.occupancy_id = occupancy.occupancy_id      
      LEFT JOIN ${raw_pmsleasing_party.sql()} P ON P.PARTY_ID = ORE.PARTY_ID              
      LEFT JOIN ${raw_pmscorecontact_entityPhone.sql()} EP ON P.PARTY_ID = EP.ENTITY_ID
      WHERE ORE.RELATIONSHIP_TYPE_NAME='Resident'
      GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12
      ),
      payments as (
              select
                p.STATUS, p.ACCOUNT_ID, p.CREATED_AT, p.DEPOSIT_ID, p.PAYMENT_ID, p.UPDATED_AT, 
                p.PAYMENT_DATE, 
                p.ACCRUAL_AMOUNT, p.PAYMENT_AMOUNT, p.TRANSACTION_ID, p.PAYMENT_CURRENCY, p.PAYMENT_METHOD_TYPE, p.PAYER_ID, PS.STATUS_NAME as PAYMENT_STATUS,
                d.NOTE
                FROM ${raw_pmsaccounting_payment.sql()} p
                LEFT JOIN  ${raw_pmsaccounting_deposit.sql()} d ON d.deposit_id = p.deposit_id
                LEFT JOIN ${raw_pmsaccounting_paymentStatus.sql()} PS ON PS.STATUS_ID = p.STATUS
                where ${FILTER_PARAMS.bus_pms_onlinePaymentActivity.paymentSubmissionDate.filter((from, to) => `p.PAYMENT_DATE >= ${from} AND p.PAYMENT_DATE <= ${to}`)}
      )
     Select 
        oc.BUSINESS_UNIT_ID,
        oc.UNIT_NAME,            
        OC.RESIDENT,
        P.PAYMENT_METHOD_TYPE as PAYMENT_TYPE,
        P.PAYMENT_AMOUNT as AMOUNT_SUBMITTED_PAID,
        case when P.STATUS = 1 then P.PAYMENT_AMOUNT else 0 end as AMOUNT_PROCESSED,
        P.PAYMENT_DATE as PAYMENT_SUBMISSION_DATE,
        P.PAYMENT_STATUS,
        P.NOTE
     From payments P
        inner JOIN occupancy_cte OC  ON P.ACCOUNT_ID = OC.occupancy_id
    `,   
   
    dimensions: {

      businessUnitId: {
        sql: ` ${CUBE}."BUSINESS_UNIT_ID"`,                 
        type: `string`,
        title: `Business Unit`
      },

      unitName: {
        sql: ` ${CUBE}."UNIT_NAME"`,                 
        type: `string`,
        title: `Unit`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        },
      },

      resident: {
        sql: ` ${CUBE}."RESIDENT"`,                 
        type: `string`,
        title: `Resident`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        },
      },

      paymentType: {
        sql: ` ${CUBE}."PAYMENT_TYPE"`,                 
        type: `string`,
        title: `Payment Type`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        },
      },

      amountSubmittedPaid: {
        sql: ` ${CUBE}."AMOUNT_SUBMITTED_PAID"`,                 
        type: `number`,
        title: `Amount Submitted/paid`,
        meta: {
          styleType: 'money',
          show: true,
          size: 135,
          sortable: true
        } 
      },

      amountProcessed: {
        sql: `${CUBE}."AMOUNT_PROCESSED"`,                 
        type: `number`,
        title: `Amount processed`,
        meta: {
          styleType: 'money',
          show: true,
          size: 135,
          sortable: true
        } 
      },

      paymentSubmissionDate: {
          sql: `${CUBE}."PAYMENT_SUBMISSION_DATE"`,                 
          type: `time`,
          title: `Payment submission date`,
          meta: {
            styleType: 'longDate',
            show: true,
            sortable: true,
            size: 150
          }
      },
     
      paymentStatus: {
        sql: ` ${CUBE}."PAYMENT_STATUS"`,                 
        type: `string`,
        title: `Payment Status`,
        meta: {
          styleType: 'string',
          show: true,
          size: 135,
          sortable: true
        }  
    }, 

    notes: {
      sql: ` ${CUBE}."NOTE"`,                 
      type: `string`,
      title: `Status notes`,
      meta: {
        styleType: 'string',
        show: true,
        size: 135,
        sortable: true
      }  
  }, 

}, 

    dataSource: `snowflake_pms`
});
