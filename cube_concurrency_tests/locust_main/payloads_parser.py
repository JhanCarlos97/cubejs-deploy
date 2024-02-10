import json
import os
from locust_main import values_generator
# import values_generator

PAYLOADS_INFO_DICT = {
    'dhr_03': {
        'cid_filter_name': 'bus_MismatchIntents_vendor_name.communityId',
        'date_filter_name': 'bus_MismatchIntents_vendor_name.turnTimeDate',
    },
    'dhr_05_1': {
        'cid_filter_name': 'stg_CommunityIntent_vendor_name.communityId'
    },
    'dhr_06': {
        'cid_filter_name': 'bus_Transcript_vendor_name.communityId',
        'date_filter_name': 'bus_Transcript_vendor_name.turnTime',
    },
    'dhm_01': {
        'cid_filter_name': 'bus_Metrics_vendor_name.communityId',
        'date_filter_name': 'bus_Metrics_vendor_name.turnDay',
    },
    'dhm_02': {
        'cid_filter_name': 'bus_Metrics_vendor_name.communityId',
        'date_filter_name': 'bus_Metrics_vendor_name.turnDay',
    },
    'dhm_03': {
        'cid_filter_name': 'bus_Metrics_vendor_name.communityId',
        'date_filter_name': 'bus_Metrics_vendor_name.turnDay',
    },
    'dhm_09': {
        'cid_filter_name': 'bus_ConversationsByTimeOfDay_vendor_name_Metrics.communityId',
        'date_filter_name': 'bus_ConversationsByTimeOfDay_vendor_name_Metrics.dt',
    },
    'dhm_10': {
        'cid_filter_name': 'bus_TourScheduledByTimeOfDay_vendor_name_Metrics.communityId',
        'date_filter_name': 'bus_TourScheduledByTimeOfDay_vendor_name_Metrics.dt',
    },
    'dhm_11': {
        'cid_filter_name': 'bus_FormSummissionsByTimeOfDay_vendor_name_Metrics.dt',
        'date_filter_name': 'bus_FormSummissionsByTimeOfDay_vendor_name_Metrics.communityId',
    },
    'dhm_22': {
        'cid_filter_name': 'bus_ConversationsByPlatformUnion_Metrics.communityId',
        'date_filter_name': 'bus_ConversationsByPlatformUnion_Metrics.turnDay',
    }
}

PAYLOADS_FILE_PATH = '.'

def generate_list_of_randomized_payloads(
    PAYLOADS_INFO_DICT = PAYLOADS_INFO_DICT):

    #So that this script can be ran from every path
    absolute_dir = os.listdir(PAYLOADS_FILE_PATH)
    payloads_treated_list = []
    print(absolute_dir)

    for payload_name, payload_info in PAYLOADS_INFO_DICT.items():
        with open(f"/mnt/Reports/{payload_name}.json") as payload_data:
            data = json.load(payload_data)

            random_cid = values_generator.generate_random_community_id()
            random_dates_list = values_generator.generate_random_dates()

            for filters_list in data['filters']:

                if filters_list['member'] == payload_info['cid_filter_name']:
                    filters_list['values'] = random_cid
                elif filters_list['member'] == payload_info['date_filter_name']:
                    filters_list['values'] = random_dates_list

        payloads_treated_list.append(data)

    print(payloads_treated_list)
                
    return payloads_treated_list

generate_list_of_randomized_payloads()