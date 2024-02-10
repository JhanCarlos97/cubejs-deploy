import json
import time
from locust import HttpUser, task, between

from locust_main.payloads_parser import generate_list_of_randomized_payloads

API_REQUEST_TYPE = 'load'

class DefaultAPIUser(HttpUser):
    wait_time = between(1, 3)

    headers = {
        'Authorization': 'authorization_key'
    }
    default_headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'}


    @task
    def single_payload_usage(self):
        payloads_list = generate_list_of_randomized_payloads()
        for payload in payloads_list:
            payload = str(payload).replace("'", '"')
            self.client.get(f"/v1/{API_REQUEST_TYPE}", headers = self.headers, params = f'query={ payload }')