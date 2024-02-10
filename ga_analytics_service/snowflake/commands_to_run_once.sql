-----------------------------------------GA DEV ENVIRONMENT----------------------------------------------
USE ROLE ACCOUNTADMIN;

USE DATABASE GA_DEV_DATABASE;
CREATE SCHEMA IF NOT EXISTS GA_ANALYTICS_SERVICE;
grant ownership on SCHEMA GA_ANALYTICS_SERVICE to role GA_DEV_ROLE revoke current grants;
USE SCHEMA GA_ANALYTICS_SERVICE;
CREATE or replace FILE FORMAT csv_format
type = csv
field_delimiter = ','
FIELD_OPTIONALLY_ENCLOSED_BY = '"'
ESCAPE_UNENCLOSED_FIELD=NONE;

--NEXT TWO LINES NEEDS TO BE RUN WITH ACCOUNTADMIN ROLE

CREATE OR REPLACE STORAGE INTEGRATION GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION
TYPE = EXTERNAL_STAGE
STORAGE_PROVIDER = S3
ENABLED = TRUE
STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::aws_account_number:role/company-ga-analytics-service-dev-snowflake-role'
STORAGE_ALLOWED_LOCATIONS = ('s3://company-ga-analytics-service-dev-data/')
COMMENT = 'GA Data Storage Integration w/ S3 dev bucket';
grant ownership on INTEGRATION GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION to role GA_DEV_ROLE;

--NEXT COMMAND IS USED TO COPY STORAGE_AWS_IAM_USER_ARN AND STORAGE_AWS_EXTERNAL_ID
--INTO TRUST POLICY OF company-ga-analytics-service-dev-snowflake-role ROLE IN IAM
DESC INTEGRATION GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION;

CREATE OR REPLACE STAGE GA_ANALYTICS_SERVICE_DEV_STAGE
URL="s3://company-ga-analytics-service-dev-data/"
STORAGE_INTEGRATION = GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION
FILE_FORMAT=csv_format;

LIST @GA_ANALYTICS_SERVICE_DEV_STAGE;

--USING HISTORICAL DATA, WE CREATED THE TABLE. THIS IS, WE RUN THE PIECE OF CODE THAT GRABS HISTORICAL INFO, UP TO 4 DAYS BACK
create table RAW_GA_ANALYTICS_SERVICE (
	HOSTNAME,
	DATE,
	COUNTRY,
	CITY,
	FIRST_USER_DEFAULT_CHANNEL_GROUP,
	PAGETITLE,
	EVENTNAME, 
	PAGEPATH, 
	OUTBOUND, 
	TOTALUSERS,
	NEWUSERS,
	SESSIONS,
	ACTIVEUSERS,
	SCREENPAGEVIEWS,
	SCREENPAGEVIEWSPERUSER,
	USERENGAGEMENTDURATION,
	ENGAGEDSESSIONS
) AS
select
$1 as HOSTNAME,
$2 as DATE,
$3 as COUNTRY,
$4 as CITY,
$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
$6 as PAGETITLE,
$7 as EVENTNAME, 
$8 as PAGEPATH, 
$9 as OUTBOUND, 
$10 as TOTALUSERS,
$11 as NEWUSERS,
$12 as SESSIONS,
$13 as ACTIVEUSERS,
$14 as SCREENPAGEVIEWS,
$15 as SCREENPAGEVIEWSPERUSER,
$16 as USERENGAGEMENTDURATION,
$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_DEV_STAGE;

--NEXT COMMAND IS USED IN ORDER TO MODIFY SNS TOPIC AND ADD "Statement" KEY CONTENT IN SNS TOPIC DEFINITION
--IN ORDER TO ALLOW THE SNOWPIPE CREATIONS
select system$get_aws_sns_iam_policy('arn:aws:sns:us-east-1:aws_account_number:analytics-service-sns');

--Create the Snowpipe
CREATE OR REPLACE PIPE GA_ANALYTICS_SERVICE_S3_RAW
AUTO_INGEST = TRUE
AWS_SNS_TOPIC = 'arn:aws:sns:us-east-1:aws_account_number:analytics-service-sns'
AS
COPY INTO RAW_GA_ANALYTICS_SERVICE
FROM (
select
	$1 as HOSTNAME,
	$2 as DATE,
	$3 as COUNTRY,
	$4 as CITY,
	$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
	$6 as PAGETITLE,
	$7 as EVENTNAME, 
	$8 as PAGEPATH, 
	$9 as OUTBOUND, 
	$10 as TOTALUSERS,
	$11 as NEWUSERS,
	$12 as SESSIONS,
	$13 as ACTIVEUSERS,
	$14 as SCREENPAGEVIEWS,
	$15 as SCREENPAGEVIEWSPERUSER,
	$16 as USERENGAGEMENTDURATION,
	$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_DEV_STAGE
)
FILE_FORMAT=(FORMAT_NAME=csv_format);

grant USAGE on INTEGRATION GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION to role GA_STG_ROLE;
grant USAGE on INTEGRATION GA_ANALYTICS_SERVICE_DEV_S3_INTEGRATION to role GA_PROD_ROLE;

--FOR STAGE WE WILL RUN THIS COMMANDS ONLY ONCE:

USE role GA_STG_ROLE;
USE DATABASE GA_STG_DATABASE;
CREATE SCHEMA IF NOT EXISTS GA_ANALYTICS_SERVICE;
USE SCHEMA GA_ANALYTICS_SERVICE;
CREATE or replace FILE FORMAT csv_format
type = csv
field_delimiter = ','
FIELD_OPTIONALLY_ENCLOSED_BY = '"'
ESCAPE_UNENCLOSED_FIELD=NONE;

CREATE OR REPLACE STAGE GA_ANALYTICS_SERVICE_STG_STAGE
URL="company-ga-analytics-service-stg-data"
STORAGE_INTEGRATION = GA_ANALYTICS_SERVICE_STG_S3_INTEGRATION
FILE_FORMAT=csv_format;



create table RAW_GA_ANALYTICS_SERVICE (
HOSTNAME,
DATE,
COUNTRY,
CITY,
FIRST_USER_DEFAULT_CHANNEL_GROUP,
PAGETITLE,
EVENTNAME, 
PAGEPATH, 
OUTBOUND, 
TOTALUSERS,
NEWUSERS,
SESSIONS,
ACTIVEUSERS,
SCREENPAGEVIEWS,
SCREENPAGEVIEWSPERUSER,
USERENGAGEMENTDURATION,
ENGAGEDSESSIONS
) AS
select
$1 as HOSTNAME,
$2 as DATE,
$3 as COUNTRY,
$4 as CITY,
$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
$6 as PAGETITLE,
$7 as EVENTNAME, 
$8 as PAGEPATH, 
$9 as OUTBOUND, 
$10 as TOTALUSERS,
$11 as NEWUSERS,
$12 as SESSIONS,
$13 as ACTIVEUSERS,
$14 as SCREENPAGEVIEWS,
$15 as SCREENPAGEVIEWSPERUSER,
$16 as USERENGAGEMENTDURATION,
$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_STG_STAGE;

CREATE OR REPLACE PIPE GA_ANALYTICS_SERVICE_S3_RAW
AUTO_INGEST = TRUE
AWS_SNS_TOPIC = 'arn:aws:sns:us-east-1:aws_account_number:analytics-service-sns'
AS
COPY INTO RAW_GA_ANALYTICS_SERVICE
FROM (
select
	$1 as HOSTNAME,
	$2 as DATE,
	$3 as COUNTRY,
	$4 as CITY,
	$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
	$6 as PAGETITLE,
	$7 as EVENTNAME, 
	$8 as PAGEPATH, 
	$9 as OUTBOUND, 
	$10 as TOTALUSERS,
	$11 as NEWUSERS,
	$12 as SESSIONS,
	$13 as ACTIVEUSERS,
	$14 as SCREENPAGEVIEWS,
	$15 as SCREENPAGEVIEWSPERUSER,
	$16 as USERENGAGEMENTDURATION,
	$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_STG_STAGE
)
FILE_FORMAT=(FORMAT_NAME=csv_format);

--FOR PROD WE WILL RUN THIS COMMANDS ONLY ONCE:

USE role GA_PROD_ROLE;
USE DATABASE GA_PROD_DATABASE;
CREATE SCHEMA IF NOT EXISTS GA_ANALYTICS_SERVICE;
USE SCHEMA GA_ANALYTICS_SERVICE;
CREATE or replace FILE FORMAT csv_format
type = csv
field_delimiter = ','
FIELD_OPTIONALLY_ENCLOSED_BY = '"'
ESCAPE_UNENCLOSED_FIELD=NONE;

CREATE OR REPLACE STAGE GA_ANALYTICS_SERVICE_PROD_STAGE
URL="s3://company-ga-analytics-service-prod-data/"
STORAGE_INTEGRATION = GA_ANALYTICS_SERVICE_PROD_S3_INTEGRATION
FILE_FORMAT=csv_format;

create table RAW_GA_ANALYTICS_SERVICE (
HOSTNAME,
DATE,
COUNTRY,
CITY,
FIRST_USER_DEFAULT_CHANNEL_GROUP,
PAGETITLE,
EVENTNAME, 
PAGEPATH, 
OUTBOUND, 
TOTALUSERS,
NEWUSERS,
SESSIONS,
ACTIVEUSERS,
SCREENPAGEVIEWS,
SCREENPAGEVIEWSPERUSER,
USERENGAGEMENTDURATION,
ENGAGEDSESSIONS
) AS
select
	$1 as HOSTNAME,
	$2 as DATE,
	$3 as COUNTRY,
	$4 as CITY,
	$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
	$6 as PAGETITLE,
	$7 as EVENTNAME, 
	$8 as PAGEPATH, 
	$9 as OUTBOUND, 
	$10 as TOTALUSERS,
	$11 as NEWUSERS,
	$12 as SESSIONS,
	$13 as ACTIVEUSERS,
	$14 as SCREENPAGEVIEWS,
	$15 as SCREENPAGEVIEWSPERUSER,
	$16 as USERENGAGEMENTDURATION,
	$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_PROD_STAGE;

CREATE OR REPLACE PIPE GA_ANALYTICS_SERVICE_S3_RAW
AUTO_INGEST = TRUE
AWS_SNS_TOPIC = 'arn:aws:sns:us-east-1:aws_account_number:analytics-service-sns'
AS
COPY INTO RAW_GA_ANALYTICS_SERVICE
FROM (
select
	$1 as HOSTNAME,
	$2 as DATE,
	$3 as COUNTRY,
	$4 as CITY,
	$5 as FIRST_USER_DEFAULT_CHANNEL_GROUP,
	$6 as PAGETITLE,
	$7 as EVENTNAME, 
	$8 as PAGEPATH, 
	$9 as OUTBOUND, 
	$10 as TOTALUSERS,
	$11 as NEWUSERS,
	$12 as SESSIONS,
	$13 as ACTIVEUSERS,
	$14 as SCREENPAGEVIEWS,
	$15 as SCREENPAGEVIEWSPERUSER,
	$16 as USERENGAGEMENTDURATION,
	$17 as ENGAGEDSESSIONS
from @GA_ANALYTICS_SERVICE_PROD_STAGE
)
FILE_FORMAT=(FORMAT_NAME=csv_format);
