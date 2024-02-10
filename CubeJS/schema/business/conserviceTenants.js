cube(`bus_provider_tenants`, {
    sql: `
        WITH occupancy_cte as 
        (SELECT
        u.business_unit_id
        ,coalesce(occ.household_move_in_date, occ.start_date) AS move_in_date
        ,coalesce(occ.household_move_out_date, occ.end_date) AS move_out_date
        ,u.unit_id AS unit_number
        ,usi.square_footage AS square_feet
        ,lve.rent_amount AS rent
        ,occ.start_date AS lease_effective_date
        ,0 AS balance_due_amount --BALANCE_DUE_AMOUNT MISSING
        ,coalesce(occupancy_phase.occupancy_phase_type, 'Vacant') as oc_phase_type
        ,occ.current_status
        ,occ.end_date AS lease_end_date
        ,ors.party_id AS person_id
        ,pty.c_given_name AS person_first_name
        ,pty.c_family_name AS person_last_name
        ,em.EMAIL_ADDRESS AS person_email
        ,ORS.occupancy_id
        ,occ.end_date AS renewal_date
        ,0 as energyze --NO LOGIC AVAILABLE
        ,A.address AS address_line1
        ,null as address_line2
        ,A.city AS address_city
        ,A.state AS address_state
        ,A.postal_code AS address_zip_code
        FROM
        ${raw_pmsleasing_unit.sql()} U
        LEFT JOIN ${raw_pmsleasing_occupancyRelationship.sql()} AS ORS ON ORS.business_unit_id = U.business_unit_id
        LEFT JOIN ${raw_pmsleasing_party.sql()} AS pty ON pty.PARTY_ID = ORS.PARTY_ID
        LEFT JOIN ${raw_pmsleasing_occupancy.sql()} AS occ ON ORS.occupancy_id = occ.occupancy_id
        LEFT JOIN ${raw_pmsleasing_occupancyPhase.sql()} AS occupancy_phase ON occupancy_phase.occupancy_id = occ.occupancy_id
        LEFT JOIN ${raw_pmsleasing_leaseValuesInEffect.sql()} AS LVE ON LVE.OCCUPANCY_ID = occ.occupancy_id AND LVE.OCCUPANCY_PHASE_INDEX = occupancy_phase.occupancy_phase_index    
        LEFT JOIN ${raw_pmscbr_unitSpecsInfo.sql()} AS USI ON USI.UNIT_TYPE_ID = U.UNIT_ID and USI.BUILDING_ID IS NOT NULL
        LEFT JOIN ${raw_pmscorecontact_entityScopeAlias.sql()} AS SPE ON SPE.ENTITY_ID = ORS.PARTY_ID AND ORS.BUSINESS_UNIT_ID = SPE.SCOPE_ID
        LEFT JOIN ${raw_pmscorecontact_entityEmail.sql()} AS EM ON EM.ENTITY_ID = SPE.ENTITY_ID
        LEFT JOIN ${raw_pmscorecontact_entityAddress.sql()} AS EA ON EA.ENTITY_ID = SPE.ENTITY_ID
        LEFT JOIN ${raw_pmscorecontact_address.sql()} AS A ON A.ADDRESS_ID = EA.ADDRESS_ID
        WHERE ORS.RELATIONSHIP_TYPE_NAME IN ('Resident', 'Applicant')
        AND (${FILTER_PARAMS.bus_provider_tenants.businessUnitId.filter((value) => `u.business_unit_id = ${value}`)})
        AND (${FILTER_PARAMS.bus_provider_tenants.startDate.filter((value) => `lease_effective_date >= ${value}`)})
        AND (${FILTER_PARAMS.bus_provider_tenants.endDate.filter((value) => `lease_end_date <= ${value}`)})
        GROUP BY 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
        )
        select
        *
        ,count(*) over (partition by business_unit_id,occupancy_id,unit_number) AS people_count
        ,CASE
            WHEN move_out_date < CURRENT_DATE()  THEN 'past'
        ELSE 'current'
        END AS resident_status,
        CASE
            WHEN oc_phase_type = 'NTV' THEN move_out_date
        ELSE null
        END AS move_out_planed_date,
        CASE
            WHEN current_status = 'ended' AND oc_phase_type = 'Terminated' THEN move_out_date
        ELSE null
        END AS move_out_actual_date
        FROM
        occupancy_cte`,
        
    dimensions: {
        
        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
            type: `string`,
            title: `Business Unit`
        },

        moveInDate: {
            sql: ` ${CUBE}."MOVE_IN_DATE"`,                 
            type: `string`,
            title: `Move In Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        moveOutDate: {
            sql: ` ${CUBE}."MOVE_OUT_DATE"`,                 
            type: `string`,
            title: `Move Out Date`,
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

        unitNumber: {
            sql: ` ${CUBE}."UNIT_NUMBER"`,                 
            type: `string`,
            title: `Unit Number`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        sqFeet: {
            sql: ` ${CUBE}."SQUARE_FEET"`,                 
            type: `string`,
            title: `Sq. Ft.`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            }
        },

        leaseRent: {
            sql: ` ${CUBE}."RENT"`,
            type: `number`,
            title: `Rent amount`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            }  
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
        
        balanceDueAmount: {
            sql: ` ${CUBE}."BALANCE_DUE_AMOUNT"`,                 
            type: `string`,
            title: `Balance Due Amount`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            },
        },

        moveOutPlanedDate: {
            sql: ` ${CUBE}."MOVE_OUT_PLANED_DATE"`,                 
            type: `string`,
            title: `Move Out Planed Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        moveOutActualDate: {
            sql: ` ${CUBE}."MOVE_OUT_ACTUAL_DATE"`,                 
            type: `string`,
            title: `Move Out Actual Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        leaseEndDate: {
            sql: ` ${CUBE}."LEASE_END_DATE"`,                 
            type: `string`,
            title: `Lease End Date`,
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
        },

        endDate: {
            sql: ` ${CUBE}."LEASE_END_DATE"`,
            type: `string`,
        },

        personId: {
            sql: ` ${CUBE}."PERSON_ID"`,
            type: `string`,
            title: `Person Id`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        personFirstName: {
            sql: ` ${CUBE}."PERSON_FIRST_NAME"`,
            type: `string`,
            title: `Person First Name`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        personLastName: {
            sql: ` ${CUBE}."PERSON_LAST_NAME"`,                 
            type: `string`,
            title: `Person Last Name`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        personEmail: {
            sql: ` ${CUBE}."PERSON_EMAIL"`,                 
            type: `string`,
            title: `Person Email`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        peopleCount: {
            sql: ` ${CUBE}."PEOPLE_COUNT"`,                 
            type: `string`,
            title: `People Count`,
            meta: {
                styleType: 'number',
                show: true,
                size: 135,
                sortable: true
            },
        },

        renewalDate: {
            sql: ` ${CUBE}."RENEWAL_DATE"`,                 
            type: `string`,
            title: `Renewal Date`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        energyze: {
            sql: ` ${CUBE}."ENERGYZE"`,                 
            type: `string`,
            title: `Energyze`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        addressLine1: {
            sql: ` ${CUBE}."ADDRESS_LINE1"`,                 
            type: `string`,
            title: `Address Line 1`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        addressLine2: {
            sql: ` ${CUBE}."ADDRESS_LINE2"`,                 
            type: `string`,
            title: `Address Line 2`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        addressCity: {
            sql: ` ${CUBE}."ADDRESS_CITY"`,                 
            type: `string`,
            title: `Address City`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        addressState: {
            sql: ` ${CUBE}."ADDRESS_STATE"`,                 
            type: `string`,
            title: `Address State`,
            meta: {
                styleType: 'string',
                show: true,
                size: 135,
                sortable: true
            },
        },

        addressZipCode: {
            sql: ` ${CUBE}."ADDRESS_ZIP_CODE"`,                 
            type: `string`,
            title: `Address Zip Code`,
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
