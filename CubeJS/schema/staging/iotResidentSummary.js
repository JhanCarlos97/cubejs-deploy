cube(`stg_iot_Resident_Summary_Pre`, {
    sql: `
    Select  unnest(ARRAY[1,5,2,6,3,7,4]) as "order",
         unnest(ARRAY['Schedule Move-In', 'Execute Move-In', 'Schedule Move-Out', 'Execute Move-Out', 'Execute Transfer',  'Execute Renew',	 'Archive Lease']) as "event_type",
         unnest(ARRAY[SUM(case  when event_type ='SCHEDULE_MOVE_IN' then 1 else 0 end),
				     SUM(case  when event_type ='EXECUTE_MOVE_IN' then 1 else 0 end),
				     SUM(case  when event_type ='SCHEDULE_MOVE_OUT' then 1 else 0 end),
				     SUM(case  when event_type ='EXECUTE_MOVE_OUT' then 1 else 0 end),
				     SUM(case  when event_type ='EXECUTE_TRANSFER' then 1 else 0 end),
				     SUM(case  when event_type ='EXECUTE_RENEW' then 1 else 0 end),
				     SUM(case  when event_type ='ARCHIVE_LEASE' then 1 else 0 end)]) as "value",
	  apartment_community_id 
From  
(
		Select
		le.event_type,
		case 
		   when event_type = 'SCHEDULE_MOVE_IN' then le.lease_start_date
		   when event_type = 'EXECUTE_MOVE_IN' then le.move_in_date
		   when event_type = 'SCHEDULE_MOVE_OUT' then le.lease_end_date
		   when event_type = 'EXECUTE_MOVE_OUT' then le.move_out_date
		   when event_type = 'EXECUTE_TRANSFER' then le.lease_end_date
		   when event_type = 'EXECUTE_RENEW' then le.lease_end_date
		   when event_type = 'ARCHIVE_LEASE' then le.lease_end_date
		end event_date,
		apartment_community_id
		from (
			   select 
			   case 
			      when l.move_in_date is null and l.status = 'PENDING' then 'SCHEDULE_MOVE_IN'
			      when l.status = 'PENDING_MOVE_IN' then 'EXECUTE_MOVE_IN'
			      when l.move_out_date is null and l.status = 'ACTIVE' and (l.subsequent_lease_id is null or sl.status in ('PENDING_ARCHIVING', 'ARCHIVED')) then 'SCHEDULE_MOVE_OUT'
			      when l.status = 'ACTIVE' and l.move_out_date is not null and (l.subsequent_lease_id is null or sl.status <> 'PENDING_TRANSFER')  then 'EXECUTE_MOVE_OUT'
			      when sl.status = 'PENDING_TRANSFER' then 'EXECUTE_TRANSFER'
			      when sl.status = 'PENDING_RENEW' then 'EXECUTE_RENEW'
			      when l.status = 'PENDING_ARCHIVING' then 'ARCHIVE_LEASE'
			   end event_type,
			   l.lease_start_date,
			   l.move_in_date,
			   l.move_out_date,
			   l.lease_end_date,
			   l.apartment_community_id
			   from ${raw_iot_lease.sql()} l
			   left join ${raw_iot_lease.sql()} sl on sl.id = l.subsequent_lease_id
			   where l.status <> 'ARCHIVED' 			   
		) le
		where le.event_type is not null
) event_sum		
where EXTRACT(epoch FROM (event_date - now())) < 0
group by apartment_community_id
order by 1
      `,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });
  cube(`stg_iot_Resident_Summary`, {
    sql: `
	Select  "order",
	        event_type,    
	        sum(value) as value,
			apartment_community_id
	From
		(	Select
			    unnest(ARRAY[1,5,2,6,3,7,4]) as "order", 
				unnest(ARRAY['Schedule Move-In', 'Execute Move-In', 'Schedule Move-Out', 'Execute Move-Out', 'Execute Transfer',  'Execute Renew',	 'Archive Lease']) as "event_type",
				0 as value,
				company_id as apartment_community_id
		from ${raw_iot_Apartment_Community.sql()} ac 		    
				union
			${stg_iot_Resident_Summary_Pre.sql()}
		) tmp
	Group by "order", event_type, apartment_community_id		
	`,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });