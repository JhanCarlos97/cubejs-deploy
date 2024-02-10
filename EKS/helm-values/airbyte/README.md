To install or update Airbyte, follow these steps:

- Set the BUCKET_NAME env variable in which the Airbyte logs will be stored (airbyte-eks-logs-stg for stg and airbyte-eks-logs-prod for prod)
- Set the ACCESS_KEY and SECRET_ACCESS_KEY env variables for the AWS account where the bucket is located
- Run `helm upgrade -f ../airbyte/values.yaml airbyte ../airbyte/ -n $NAMESPACE --set global.logs.accessKey.password=$ACCESS_KEY --set global.logs.secretKey.password=$SECRET_ACCESS_KEY --set global.logs.s3.bucket=$BUCKET_NAME`