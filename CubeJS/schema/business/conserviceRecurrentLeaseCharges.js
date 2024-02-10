cube(`bus_provider_recurrentLeaseCharges`, {
    sql: `
        with leasing_precte as (
        SELECT
        u.business_unit_id
        ,occ.occupancy_id
        ,coalesce(occ.household_move_in_date, occ.start_date) AS move_in_date
        ,coalesce(occ.household_move_out_date, occ.end_date) AS move_out_date
        ,occ.start_date AS lease_effective_date
        ,occ.end_date AS lease_end_date
        FROM
        ${raw_pmsleasing_unit.sql()} U
        LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} AS ORS ON ORS.business_unit_id = U.business_unit_id
        LEFT JOIN ${raw_pmsleasing_occupancy.sql()} AS occ ON ORS.occupancy_id = occ.occupancy_id
        WHERE ORS.RELATIONSHIP_TYPE_NAME IN ('Resident', 'Applicant')
        AND (${FILTER_PARAMS.bus_provider_recurrentLeaseCharges.businessUnitId.filter((value) => `u.business_unit_id = ${value}`)})
        AND (${FILTER_PARAMS.bus_provider_recurrentLeaseCharges.startDate.filter((value) => `lease_effective_date >= ${value}`)})
        AND (${FILTER_PARAMS.bus_provider_recurrentLeaseCharges.endDate.filter((value) => `lease_end_date <= ${value}`)})
        GROUP BY 1, 2, 3, 4, 5, 6
        ),
        leasing_cte as (
            select *,
            CASE
                WHEN move_out_date < CURRENT_DATE()  THEN 'past'
            ELSE 'current'
            END AS resident_status
            from leasing_precte
        )
        SELECT
        c.community_id AS BUSINESS_UNIT_ID
        ,ch.AMOUNT
        ,ch.CODE_ID
        ,codecat.NAME as CHARGEABLE_TYPE
        ,codecat.ID as CHARGEABLE_ID
        ,ch.DUE_DATE
        ,'Charge' as TYPE
        ,L.move_in_date as LEASE_MOVE_IN_DATE
        ,L.LEASE_EFFECTIVE_DATE
        ,L.LEASE_END_DATE
        ,L.RESIDENT_STATUS
        ,null as FREQUENCY
        ,ch.NOTES
        ,C.name as CHARGE_CODE_DESCRIPTION
        FROM ${raw_pmsaccounting_charge.sql()} ch
        LEFT JOIN ${raw_pmsaccounting_code.sql()} C on C.id = ch.code_id
        INNER JOIN ${raw_pmsaccounting_codeCategory.sql()} as codecat ON C.code_category_id = codecat.id and codecat.name = 'Rent'
        LEFT JOIN leasing_cte L on L.occupancy_id = ch.account_id
        where C.DELETED_AT is null AND ch.bind_id is not null and ch.status = 1
        `,

    dimensions: {
    
        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
            type: `string`,
            title: `Business Unit`
        },

        amount: {
            sql: ` ${CUBE}."AMOUNT"`,                 
            type: `string`,
            title: `Amount`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            },
        },

        chargeCodeId: {
            sql: `${CUBE}."CODE_ID"`,
            type: `string`,
            title: `Charge Code Id`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        chargeableType: {
            sql: `${CUBE}."CHARGEABLE_TYPE"`,
            type: `string`,
            title: `Chargeable Type`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        chargeableId: {
            sql: `${CUBE}."CHARGEABLE_ID"`,
            type: `string`,
            title: `Chargeable Id`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        dueDate: {
            sql: ` ${CUBE}."DUE_DATE"`,
            type: `string`,
            title: `Due Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        leaseMoveInDate: {
            sql: ` ${CUBE}."LEASE_MOVE_IN_DATE"`,
            type: `string`,
            title: `Move In Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        leaseEffectiveDate: {
            sql: ` ${CUBE}."LEASE_EFFECTIVE_DATE"`,                 
            type: `string`,
            title: `Lease Effective Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        residentStatus: {
            sql: ` ${CUBE}."RESIDENT_STATUS"`,
            type: `string`,
            title: `Resident Status`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        startDate: {
            sql: ` ${CUBE}."LEASE_EFFECTIVE_DATE"`,                 
            type: `string`,
            title: `Starts At`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        endDate: {
            sql: ` ${CUBE}."LEASE_END_DATE"`,
            type: `string`,
            title: `Ends At`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        frequency: {
            sql: ` ${CUBE}."FREQUENCY"`,
            type: `string`,
            title: `Frequency`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        notes: {
            sql: ` ${CUBE}."NOTES"`,
            type: `string`,
            title: `Notes`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        chargeCodeDescription: {
            sql: `${CUBE}."CHARGE_CODE_DESCRIPTION"`,
            type: `string`,
            title: `Charge Code Description`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        type: {
            sql: ` ${CUBE}."TYPE"`,
            type: `string`,
            title: `Type`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },
    },
        
    dataSource: `snowflake_pms`
    
    }
);