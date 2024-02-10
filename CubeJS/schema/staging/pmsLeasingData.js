cube(`stg_pms_leasingData`, {
  sql: `
  select
    occ.occupancy_id occupancyId,
    occ.household_move_in_date startDate,
    occ.household_move_out_date endDate,
    occ.current_status currentStatus,
    occ.customer_id customerId,
    occ.business_unit_id businessUnitId,
    unit.c_unit_name unit,
    occrel.valid_span,
    case when occ.household_move_out_date < current_date() then true else false end as past,
    convert_timezone('UTC', 'US/Central', TO_TIMESTAMP_NTZ(SUBSTRING(occrel.valid_span, 3, 19))) AS valid_span_lower_ts,
    case when SUBSTRING(occrel.valid_span, -1) = ')' 
    then dateadd(d, -1, convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBSTRING(split_part(valid_span, ',', 2), 2, 19)))) 
        else convert_timezone('UTC', c.timezone_id, TO_TIMESTAMP_NTZ(SUBSTRING(split_part(valid_span, ',', 2), 2, 19))) end AS valid_span_upper_ts, /* case statement to exclude upper-bound*/
  party.FULLNAME as residentName 
  from ${raw_pmsleasing_occupancy.sql()} occ
  inner join ${raw_pmsleasing_occupancyRelationship.sql()} occrel 
  on occrel.occupancy_id = occ.occupancy_id 
  and occrel.relationship_type_name = 'Resident' --limit to only Resident relationships
  inner join ${raw_pmsleasing_party.sql()} party on occrel.party_id  = party.party_id 
  inner join ${raw_pmsleasing_unit.sql()} on occ.unit_id  = unit.unit_id 
  left join ${raw_pmsauth_communities.sql()} c on occ.business_unit_id = c.id /* to get the timezone_id */
  where (valid_span not in ('empty', '') and split_part(valid_span, ',', 2) not in ('infinity)') and right(valid_span, 2) not in (',)'))
  `,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
    
  dimensions: {

    occupancyId: {
      sql: `occupancyId`,
      type: `string`,
      primaryKey: true
    },

    startDate: {
      sql: `startDate`,
      type: `time`
    },
    
    endDate: {
      sql: `endDate`,
      type: `time`
    },

    currentStatus: {
      sql: `currentStatus`,
      type: `string`
    },
    
    customerId: {
      sql: `customerId`,
      type: `string`
    },

    businessUnitId: {
      sql: `businessUnitId`,
      type: `string`
    },

    unit: {
      sql: `unit`,
      type: `string`
    },

    past: {
      sql: `past`,
      type: `string`
    },

    validSpan: {
      sql: `valid_span`,
      type: `string`
    },
    
    validSpanLowerTs: {
      sql: `valid_span_lower_ts`,
      type: `time`
    },

    validSpanUpperTs: {
      sql: `
        valid_span_upper_ts`,
      type: `time`
    },

    residentName: {
      sql: `
        residentName`,
      type: `string`
    },
  
  },
    

  dataSource: `snowflake_pms`
});

cube(`stg_pms_leasingDataAgg`, {
  sql: `
  select
    occupancyId, 
    unit, 
    past, 
    listagg(distinct residentName, ', ') WITHIN GROUP (ORDER BY residentName) resident
    from ${stg_pms_leasingData.sql()}
group by occupancyId, unit, past
  `,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
    
  dimensions: {

    occupancyId: {
      sql: `occupancyId`,
      type: `string`,
      primaryKey: true
    },
  
    unit: {
      sql: `unit`,
      type: `string`
    },

    past: {
      sql: `past`,
      type: `string`
    },

    resident: {
      sql: `resident`,
      type: `string`
    },
  
  },
    
  dataSource: `snowflake_pms`
});