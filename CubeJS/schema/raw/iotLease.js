cube(`raw_iot_lease`, {
    sql: `select 
    a.id, 
    a.created_at, 
    a.updated_at, 
    a.lease_id, 
    a.external_lease_id, 
    a.primary_location_id, 
    a.lease_start_date, 
    a.lease_end_date, 
    a.preceding_lease_id, 
    a.subsequent_lease_id, 
    a.status, 
    a.ntv_date, 
    a.permissions_role_id, 
    a.user_group_id,
    a.apartment_community_id as iot_id, 
		b.company_id as apartment_community_id,
    c.move_in_date,
    c.move_out_date
    from lease a
    left join ${raw_iot_Apartment_Community.sql()} b on a.apartment_community_id = b.iot_id
    left join (
      select 
      lease_id,
      min(move_in_date) move_in_date,
      max(move_out_date) move_out_date
      from ${raw_iot_leaseResident.sql()}
      group by lease_id) c on a.id = c.lease_id`,
    
    dataSource: `postgres_iot`
  });