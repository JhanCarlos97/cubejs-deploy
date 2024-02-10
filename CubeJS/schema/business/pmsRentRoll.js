cube(`bus_pms_rentRoll`, {
sql: `
with residentList as (
  select 
    occupancy_relationship.BUSINESS_UNIT_ID,
    occupancy_relationship.OCCUPANCY_ID,
    ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter() === '1 = 1' ? 'NULL' : FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => `${value}`)} as DATE,
    listagg(distinct party.FULLNAME, ', ') WITHIN GROUP (ORDER BY party.FULLNAME) RESIDENTS
    from ${raw_pmsleasing_occupancyRelationship.sql()} as occupancy_relationship
    inner join ${raw_pmsleasing_party.sql()} as party on occupancy_relationship.party_id = party.party_id 
    left join ${raw_pmsauth_communities.sql()} as c on occupancy_relationship.business_unit_id = c.id
  where 
    (${FILTER_PARAMS.bus_pms_rentRoll.businessUnitId.filter((value) => `occupancy_relationship.business_unit_id = ${value}`)}) 
    and ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => 
      `convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_LOWER)) <= ${value}`)}
    and ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => 
            `convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBS_VALID_SPAN_UPPER)) >= ${value}`)} 
            and occupancy_relationship.relationship_type_name ='Resident'     
  group by 
    occupancy_relationship.business_unit_id,
    occupancy_relationship.occupancy_id)
  
, activeOccupancies as (
select
  occupancy.business_unit_id,
  occupancy.occupancy_id,
  occupancy.unit_id,
  occupancy_phase.occupancy_phase_index,
  occupancy_phase.occupancy_phase_type,
  occupancy.household_move_in_date,
  occupancy.start_date,
  occupancy_phase.occupancy_phase_span,
  occupancy_phase.SUBS_SPAN_LOWER as lower_span,
  occupancy_phase.SUBS_SPAN_UPPER as upper_span,
  occupancy.household_move_out_date,
  occupancy_phase.market_rent_rate_at_start,
  coalesce (occupancy.household_move_in_date, occupancy.start_date) move_in_date,
  lease_values_in_effect.rent_amount,		
  residentList.residents,
  ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter() === '1 = 1' ? 'NULL' : FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => `${value}`)} as DATE
from ${raw_pmsleasing_occupancyPhase.sql()} as occupancy_phase
    join ${raw_pmsleasing_occupancy.sql()} as occupancy on occupancy_phase.occupancy_id  = occupancy.occupancy_id 
    left join ${raw_pmsleasing_leaseValuesInEffect.sql()} as lease_values_in_effect on lease_values_in_effect.occupancy_id = occupancy_phase.occupancy_id
      and lease_values_in_effect.occupancy_phase_index = occupancy_phase.occupancy_phase_index 
    left join residentList on residentList.occupancy_id  = occupancy_phase.occupancy_id
    where ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => 
      `SUBS_SPAN_LOWER <= ${value}`)}
      and ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => 
        `SUBS_SPAN_UPPER >= ${value}`)}

),

recurring as (
SELECT
  c.account_id, 
  c.post_date,
  code.name AS charge_name, 
  c.amount AS charge_amount
FROM ${raw_pmsaccounting_charge.sql()} as c 
  inner JOIN ${raw_pmsaccounting_code.sql()} as code ON code.id = c.code_id
WHERE c.bind_id is not null and c.status = 1
AND ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => `date_trunc('month', c.post_date) = date_trunc('month', ${value}::timestamp)`)}
),

rent as (
  SELECT
    c.account_id, 
    sum(c.amount) AS rent_charge_amount
  FROM ${raw_pmsaccounting_charge.sql()} as c 
    inner JOIN ${raw_pmsaccounting_code.sql()} as code ON code.id = c.code_id
    inner JOIN ${raw_pmsaccounting_codeCategory.sql()} as codecat ON code.code_category_id = codecat.id and codecat.name = 'Rent'
  WHERE c.bind_id is not null and c.status = 1
  AND ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => `date_trunc('month', c.post_date) = date_trunc('month', ${value}::timestamp)`)}
  group by c.account_id
  ),

amnt as (select SUM(ca.total) as AMNT_RENT_TOTAL, cal.location_id 
            from ${raw_pmsamnt_commAmntLocations.sql()} cal
            left join ${raw_pmsamnt_commAmnt.sql()} ca on cal.community_amenity_id = ca.id
            group by cal.location_id)
  
  SELECT
  u.business_unit_id,
  u.unit_id,
  ao.occupancy_id,
	u.c_unit_name unit_name,
  ut.name as unit_type,
  usi.square_footage AS sqft,
  ut.BEDROOM_NUM AS BEDROOM_NUM,
  ut.BATHROOM_NUM AS BATHROOM_NUM,
	ao.residents,
	coalesce(ao.occupancy_phase_type, 'Vacant') as unit_status,
	coalesce(ao.move_in_date, '1900-01-01') as move_in_date,
  ao.start_date as lease_start_date,
	ao.upper_span as lease_expiration_date, 
	ao.household_move_out_date move_out_date,
  coalesce(usi.base_rent, ut.base_rent) current_base_rent,
  coalesce(amnt.AMNT_RENT_TOTAL, 0) as AMNT_RENT_TOTAL,
  coalesce(usi.base_rent, ut.base_rent) + coalesce(amnt.AMNT_RENT_TOTAL, 0) as current_market_rent,
  usi.pro_forma_rent,
	ao.rent_amount lease_rent_amount,
  recurring.charge_name,
  recurring.charge_amount,
  rent.rent_charge_amount,
  ${FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter() === '1 = 1' ? 'NULL' : FILTER_PARAMS.bus_pms_rentRoll.transactionDate.filter((value) => `${value}`)} as DATE
  from ${raw_pmsleasing_unit.sql()} u
    left join activeOccupancies ao on ao.business_unit_id = u.business_unit_id and ao.unit_id  = u.unit_id 
    left join recurring on ao.occupancy_id = recurring.account_id
    left join rent on ao.occupancy_id = rent.account_id
    left join ${raw_pmscbr_unitSpecsInfo.sql()} usi on usi.unit_id = u.unit_id and usi.building_id is not null
    left join ${raw_pmscbr_unitTypes.sql()} ut on usi.unit_type_id = ut.id
    left join amnt on u.unit_id = amnt.location_id
  where  (${FILTER_PARAMS.bus_pms_rentRoll.businessUnitId.filter((value) => `u.business_unit_id = ${value}`)}) `,

  measures: {
    currentBaseRentAmount: {
      sql: `${CUBE}."CURRENT_BASE_RENT"`,                
      type: `sum`,
      title: `Current base rent`
    },

    amenitiesRentAmount: {
      sql: `${CUBE}."AMNT_RENT_TOTAL"`,                
      type: `sum`,
      title: `Amenities amount`
    },

    currentMarketRentAmount: {
      sql: `${CUBE}."CURRENT_MARKET_RENT"`,                
      type: `sum`,
      title: `Mkt rent`
    },

    proFormaRentAmount: {
      sql: `${CUBE}."PRO_FORMA_RENT"`,                
      type: `sum`,
      title: `Pro forma rent`
    },

    leaseRentAmount: {
      sql: `${CUBE}."LEASE_RENT_AMOUNT"`,                
      type: `sum`,
      title: `Lease rent`
    },

    recTransactionAmount: {
      sql: `${CUBE}."CHARGE_AMOUNT"`,                
      type: `sum`,
      title: `Recurring transaction amount`
    },

    rentChargesAmount: {
      sql: `${CUBE}."RENT_CHARGE_AMOUNT"`,                
      type: `sum`,
      title: `Rent charges`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true
      }

    },
    
    difference: {
      sql: `${CUBE}."LEASE_RENT_AMOUNT" - ${CUBE}."CURRENT_MARKET_RENT"`,                
      type: `sum`,
      title: `difference`
    },

    },

  dimensions: {

    businessUnitId: {
      sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
      type: `string`,
      title: `BusinessUnit`
    },

    occupancyId: {
      sql: `${CUBE}."OCCUPANCY_ID"`,                
      type: `string`,
      title: `Occupancy`,
      primaryKey: true
    },

    unitId: {
      sql: `${CUBE}."UNIT_ID"`,                
      type: `string`,
      title: `UnitID`
    },

    unitName: {
      sql: `${CUBE}."UNIT_NAME"`,                
      type: `string`,
      title: `Unit`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 76,
        isGroupIdentifier: true
      }
    },

    unitType: {
      sql: `${CUBE}."UNIT_TYPE"`,                
      type: `string`,
      title: `Unit type`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 112
      }
    },

    sqft: {
      sql: `${CUBE}."SQFT"`,                
      type: `string`,
      title: `Sq. feet`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 104
      }
    },

    residents: {
      sql: `${CUBE}."RESIDENTS"`,                
      type: `string`,
      title: `Resident`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 164
      }
    },

    unitStatus: {
      sql: `${CUBE}."UNIT_STATUS"`,                
      type: `string`,
      title: `Status`,
      meta: {
        styleType: 'string',
        show: true,
        sortable: true,
        size: 93
      }
    },

    availableDate: {
      sql: `${CUBE}."LEASE_EXPIRATION_DATE"`,                
      type: `time`,
      title: `Available date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 101
      }
    },

    moveInDate: {
      sql: `${CUBE}."MOVE_IN_DATE"`,                
      type: `time`,
      title: `Move in date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 101
      }
    },

    moveOutDate: {
      sql: `${CUBE}."MOVE_OUT_DATE"`,                
      type: `time`,
      title: `Move out date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 112
      }
    },

    leaseStartDate: {
      sql: `${CUBE}."LEASE_START_DATE"`,                
      type: `time`,
      title: `Lease start date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 125
      }
    },

    leaseExpirationDate: {
      sql: `${CUBE}."LEASE_EXPIRATION_DATE"`,                
      type: `time`,
      title: `Lease expire date`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true,
        size: 150
      }
    },

    marketRent: {
      sql: `${CUBE}."CURRENT_MARKET_RENT"`,                
      type: `string`,
      title: `Mkt rent`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 89
      }
    },

    proFormaRent: {
      sql: `${CUBE}."PRO_FORMA_RENT"`,                
      type: `string`,
      title: `Pro forma rent`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 89
      }
    },

    leaseRent: {
      sql: `${CUBE}."LEASE_RENT_AMOUNT"`,                
      type: `string`,
      title: `Lease rent`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 100
      }
    },

    deposit: {
      sql: `0`,                
      type: `string`,
      title: `Deposit`,
      meta: {
        styleType: 'money',
        show: true,
        sortable: true,
        size: 89
      }
    },

    transactionDate: {
      sql: `${CUBE}."DATE"`,                
      type: `string`,
      title: `transactionDate`,
      meta: {
        styleType: 'longDate',
        show: true,
        sortable: true
      }
    },

    recTransaction: {
      sql: `${CUBE}."CHARGE_NAME"`,                
      type: `string`,
      title: `Recurring transactions`,
      meta: {
        show: true,
        sortable: false,
        size: 200,
        styleType: 'text',
        isInnerData: true,
        quickFilterHide: true,
        noWrap: true
      }
    },

    recAmount: {
      sql: `${CUBE}."CHARGE_AMOUNT"`,                
      type: `number`,
      title: `Recurring transaction amount`,
      meta: {
        show: true,
        sortable: false,
        size: 220,
        styleType: 'money',
        isInnerData: true,
        sumToTotal: true,
      }
    },

    roomNo: {
      sql: ` TO_CHAR(${CUBE}."BEDROOM_NUM") || '/' || TO_CHAR(${CUBE}."BATHROOM_NUM") `,                
      type: `number`,
      title: `bed / bath`,
      meta: {
        show: true,
        sortable: true,
        size: 220,       
        isInnerData: true,
        sumToTotal: true,
      }
    },

},  

segments: {
 
},

  dataSource: `snowflake_pms`

});




