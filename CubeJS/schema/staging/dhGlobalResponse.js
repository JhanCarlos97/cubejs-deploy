cube(`stg_another_provider_GlobalIntentResponse`, {
    sql: `
    select
    ihgir.intent_response_id as intent_response_id,
    i.intent_name as intent_name_no_suggest,
    i.intent_category_name as main_topic, 
    ip.suggestion_text as conversation_detail, 
    (case when ip.suggestion_text = i.suggestion_text THEN 'General' ELSE i.suggestion_text END) as next_level_detail, 
    ir.response_text as response, 
    count(ciugir.intent_response_id) as communities_using_this_response,
    (case when i.default_response_id = ihgir.intent_response_id THEN true ELSE false END) as default_response
    from ${raw_another_provider_IntentHasGlobalIntentResponse.sql()} ihgir 
        inner join ${raw_another_provider_Intent.sql()} i on ihgir.intent_name = i.intent_name
        inner join ${raw_another_provider_IntentResponse.sql()} ir on ihgir.intent_response_id = ir.id_intent_response
        left join ${raw_another_provider_CommunityIntentUsesGlobalIntentResponse.sql()} ciugir on ihgir.intent_response_id = ciugir.intent_response_id and ihgir.intent_name = ciugir.intent_name
        left join ${raw_another_provider_IntentHierarchy.sql()} ih on ih.intent_name_child = i.intent_name
        left join ${raw_another_provider_Intent.sql()} ip on ih.intent_name_parent = ip.intent_name
    where
    ihgir.intent_response_id != i.default_response_id
    and ip.suggestion_text IS NOT NULL
    and i.disabled_at IS null
    group by
    ciugir.intent_response_id,i.intent_name,ihgir.intent_response_id,ir.response_text,ciugir.intent_response_id,i.intent_category_name,i.suggestion_text,ip.suggestion_text,i.default_response_id`,
      dataSource: `snowflake_vendor_source`
  });
  
cube(`stg_another_provider_IntentResponseGR`, {
    sql: `
    select
    i.default_response_id as intent_response_id,
    i.intent_name as intent_name_no_suggest,
    i.intent_category_name as main_topic, 
    ip.suggestion_text as conversation_detail,
    (case when ip.suggestion_text = i.suggestion_text THEN 'General' ELSE i.suggestion_text END) as next_level_detail,
    ir.response_text as response, 
    count(ciugir.intent_response_id) as communities_using_this_response,
    true as default_response
    from ${raw_another_provider_Intent.sql()} i
    inner join ${raw_another_provider_IntentResponse.sql()} ir on i.default_response_id = ir.id_intent_response
    left join ${raw_another_provider_IntentHierarchy.sql()} ih on ih.intent_name_child = i.intent_name
    left join ${raw_another_provider_Intent.sql()} ip on ih.intent_name_parent = ip.intent_name
    left join ${raw_another_provider_CommunityIntentUsesGlobalIntentResponse.sql()}  ciugir on i.default_response_id = ciugir.intent_response_id and i.intent_name = ciugir.intent_name
    where 
    ip.suggestion_text IS NOT NULL
    and i.disabled_at IS NULL
    group by
    i.default_response_id,
    i.intent_name,
    i.intent_category_name,
    ip.suggestion_text,
    ir.response_text,
    ciugir.intent_response_id,
    i.suggestion_text`,

      dataSource: `snowflake_vendor_source`
  });