import pandas as pd
from faker import Faker
import random

COMMUNITY_IDS_LIST = [
    'some_community_ids']

DATES_RANGE = ['2021-01-01', '2021-03-30']

def generate_random_dates(DATES_RANGE=DATES_RANGE):
    fake = Faker()

    min_random_date = fake.date_between(start_date= pd.to_datetime(DATES_RANGE[0]), end_date=pd.to_datetime(DATES_RANGE[1]))
    max_random_date = fake.date_between(start_date= min_random_date, end_date=pd.to_datetime(DATES_RANGE[1]) + pd.DateOffset(days=1))

    return [min_random_date.strftime("%Y-%m-%d"), max_random_date.strftime("%Y-%m-%d")]

def generate_random_community_id(COMMUNITY_IDS_LIST=COMMUNITY_IDS_LIST):

    random_cid = random.choice(COMMUNITY_IDS_LIST)

    return [random_cid]