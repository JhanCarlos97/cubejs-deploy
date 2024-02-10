// Here, the joins should be done using the Cube syntax instead of the SQL,
// but since we're going to use Snowflake tasks it isn't worth to write it all down
cube(`stg_another_provider_CustomAll`, {
    sql: `
    select
    intent.intent_category_name as MainTopic,
    intent_parent.suggestion_text as CnversationDetail,
    (case when intent_parent.suggestion_text = intent.suggestion_text THEN 'General' ELSE intent.suggestion_text END) as NextLevelDetail,
    (case when intentResponse.response_text_updated_at  > intentResponse.spanish_response_text_updated_at and (intentResponse.spanish_response_text != '' or intentResponse.spanish_response_text is NOT null)  then 'outDatedTranslated'  when intentResponse.spanish_response_text = '' or intentResponse.spanish_response_text is null then 'notTranslated' else 'translated' end) as translate_status,
    intentResponse.response_text as ResponseText,
    intentResponse.spanish_response_text as SpanishResponseText,
    communityIntent.intent_name as intent_name,
    communityIntentResponse.intent_response_id as intent_response_id,
    communityIntentResponse.community_intent_id as community_intent_id,
    intentResponse.indicates_feature_not_present as indicates_feature_not_present,
    community.c_community_name as community_name,
    community.id_community as community_id,
    communityIntentResponse.flagged as flagged,
    communityIntentResponse.approved as approved,
    communityIntentResponse.disabled as disabled,
    communityIntentResponse.blocked as blocked
from ${raw_another_provider_CommunityIntent.sql()} communityIntent
inner Join ${raw_another_provider_CommunityIntentUsesCommunityIntentResponse.sql()} CommunityIntentResponse on communityIntent.id_community_intent = communityIntentResponse.community_intent_id
inner Join ${raw_another_provider_IntentResponse.sql()} intentResponse on communityIntentResponse.intent_response_id = intentResponse.id_intent_response
inner join ${raw_another_provider_Intent.sql()} as intent on communityIntentResponse.intent_name = intent.intent_name
left Join ${raw_another_provider_IntentHierarchy.sql()} intentHierarchy on intentHierarchy.intent_name_child = intent.intent_name
left Join ${raw_another_provider_Intent.sql()} intent_parent on intentHierarchy.intent_name_parent = intent_parent.intent_name
inner Join ${raw_another_provider_Community.sql()} on communityIntent.community_id = community.id_community
where intent_parent.suggestion_text IS NOT null
and intent.disabled_at IS null`,

      dataSource: `snowflake_vendor_source`
  });
  
// Here, the joins should be done using the Cube syntax instead of the SQL,
// but since we're going to use Snowflake tasks it isn't worth to write it all down
cube(`stg_another_provider_GlobalRest`, {
    sql: `
    select
    intent.intent_category_name as MainTopic,
    intent_parent.suggestion_text as ConversationDetail,
    (case when intent_parent.suggestion_text = intent.suggestion_text THEN 'General' ELSE intent.suggestion_text END) as NextLevelDetail,
    (case when intentResponse.response_text_updated_at  > intentResponse.spanish_response_text_updated_at and (intentResponse.spanish_response_text != '' or intentResponse.spanish_response_text is NOT null)  then 'outDatedTranslated'  when intentResponse.spanish_response_text = '' or intentResponse.spanish_response_text is null then 'notTranslated' else 'translated' end) as translate_status,
    intentResponse.response_text as ResponseText,
    intentResponse.spanish_response_text as SpanishResponseText,
    intentHasGlobalIntentResponse.intent_response_id as intent_response_id,
    intentHasGlobalIntentResponse.intent_name as intent_name,
    intentResponse.indicates_feature_not_present as indicates_feature_not_present,
    count(communityIntentUsesGlobalIntentResponse.intent_response_id) as number_of_communities,
    intent.default_response_id as default_response_id,
    intentHierarchy.intent_name_parent as intent_name_parent
    from ${raw_another_provider_IntentHasGlobalIntentResponse.sql()} intentHasGlobalIntentResponse
        inner join ${raw_another_provider_IntentResponse.sql()}  intentResponse on intentHasGlobalIntentResponse.intent_response_id = intentResponse.id_intent_response
        inner join ${raw_another_provider_Intent.sql()} as intent on intentHasGlobalIntentResponse.intent_name = intent.intent_name
        left join ${raw_another_provider_CommunityIntentUsesGlobalIntentResponse.sql()} communityIntentUsesGlobalIntentResponse on intentHasGlobalIntentResponse.intent_response_id = communityIntentUsesGlobalIntentResponse.intent_response_id and intentHasGlobalIntentResponse.intent_name = communityIntentUsesGlobalIntentResponse.intent_name
        inner join ${raw_another_provider_IntentHierarchy.sql()} intentHierarchy on intentHierarchy.intent_name_child = intent.intent_name
        left join ${raw_another_provider_Intent.sql()} intent_parent on intentHierarchy.intent_name_parent = intent_parent.intent_name
    where intentHasGlobalIntentResponse.intent_response_id != intent.default_response_id
        and intent.disabled_at IS null
        and intent_parent.suggestion_text IS NOT NULL
    group by intentHasGlobalIntentResponse.intent_response_id, intentHasGlobalIntentResponse.intent_name, intentResponse.response_text, spanish_response_text, intentResponse.indicates_feature_not_present, communityIntentUsesGlobalIntentResponse.intent_response_id, intent.default_response_id, intent.intent_category_name, intentHierarchy.intent_name_parent,  intentResponse.response_text_updated_at, intentResponse.spanish_response_text_updated_at, intent_parent.suggestion_text, intent.suggestion_text
    `,

      dataSource: `snowflake_vendor_source`
  });

// Here, the joins should be done using the Cube syntax instead of the SQL,
// but since we're going to use Snowflake tasks it isn't worth to write it all down
cube(`stg_another_provider_GlobalDefault`, {
    sql: `
    select
    intent.intent_category_name as intent_category_name,
    intent_parent.suggestion_text as suggestion_text,
    (case when intent_parent.suggestion_text = intent.suggestion_text THEN 'General' ELSE intent.suggestion_text END) as next_level_detail,
    (case when intentResponse.response_text_updated_at  > intentResponse.spanish_response_text_updated_at and (intentResponse.spanish_response_text != '' or intentResponse.spanish_response_text is NOT null)  then 'outDatedTranslated' when intentResponse.spanish_response_text = '' or intentResponse.spanish_response_text is null then 'notTranslated' else 'translated' end) as translate_status,
    intentResponse.response_text as response_text,
    intentResponse.spanish_response_text as spanish_response_text,
    intent.default_response_id as intent_response_id,
    intent.intent_name as intent_name,
    intentResponse.indicates_feature_not_present as indicates_feature_not_present,
    count(communityIntentUsesGlobalIntentResponse.intent_response_id) as number_of_communities,
    intent.default_response_id as default_response_id,
    intentHierarchy.intent_name_parent as intent_name_parent
from ${raw_another_provider_Intent.sql()}
inner join ${raw_another_provider_IntentResponse.sql()} intentResponse on intent.default_response_id = intentResponse.id_intent_response
left join ${raw_another_provider_IntentHierarchy.sql()} intentHierarchy on intentHierarchy.intent_name_child = intent.intent_name
left Join ${raw_another_provider_CommunityIntentUsesGlobalIntentResponse.sql()} communityIntentUsesGlobalIntentResponse on intent.default_response_id = communityIntentUsesGlobalIntentResponse.intent_response_id and intent.intent_name = communityIntentUsesGlobalIntentResponse.intent_name
left Join ${raw_another_provider_Intent.sql()} intent_parent on intentHierarchy.intent_name_parent = intent_parent.intent_name
where intent_parent.suggestion_text IS NOT NULL 
and intent.disabled_at IS NULL
group by intent.default_response_id, intent.intent_name, intentResponse.response_text, intentResponse.spanish_response_text, intentResponse.indicates_feature_not_present, communityIntentUsesGlobalIntentResponse.intent_response_id, intent.default_response_id, intent.intent_category_name, intentHierarchy.intent_name_parent, intentResponse.spanish_response_text,  intentResponse.response_text_updated_at, intentResponse.spanish_response_text_updated_at, intent_parent.suggestion_text, intent.suggestion_text
`,

      dataSource: `snowflake_vendor_source`
  });