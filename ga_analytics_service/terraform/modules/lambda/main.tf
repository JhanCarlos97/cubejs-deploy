locals {
  RESOURCE_NAME = "${var.PROJECT_NAME}-${var.ENV}-${var.RESOURCE_SUFFIX}"
}

module "permissions" {
  source              = "./permissions"
  RESOURCE_NAME       = local.RESOURCE_NAME
  SECRET_MANAGERS_ARN = var.SECRET_MANAGERS_ARN
  ENV                 = var.ENV
}

# module "package" {
#   source = "./package"
#   PACKAGE_SETTINGS = {
#     type               = "zip"
#     lambda_script_folder = var.LAMBDA_SETTINGS["lambda_script_folder"]
#     folder_output_name = var.RESOURCE_SUFFIX
#   }
# }

module "observability" {
  source                      = "./observability"
  ALARM_PERIOD                = var.ALARM_PERIOD
  OBSERVABILITY_SETTINGS = {
    "lambda_function_name"    = local.RESOURCE_NAME
    "log_retention_in_days"   = var.LOG_RETENTION_IN_DAYS
  }
  AWS_TAGS = var.AWS_TAGS
  ACTIONS_SETTINGS = {
    alarm_actions             = [var.ALARM_ARN]
    ok_actions                = []
    insufficient_data_actions = []
  }
}

module "invoker" {
  source = "./invoker"
  INVOKER_TRIGGER_PARAMETERS = {
    create_invoker  = var.CREATE_INVOKER_TRIGGER
    lambda_arn      = aws_lambda_function.lambda.arn
    statement_id    = var.INVOKER_TRIGGER_PARAMETERS["statement_id"]  == "" ? "AllowExecutionFromCloudWatch" : var.INVOKER_TRIGGER_PARAMETERS["statement_id"]
    principal       = var.INVOKER_TRIGGER_PARAMETERS["principal"]     == "" ? "events.amazonaws.com" : var.INVOKER_TRIGGER_PARAMETERS["principal"]
    source_arn      = var.INVOKER_TRIGGER_PARAMETERS["source_arn"]    == "" ? module.cloudwatch-trigger.arn : var.INVOKER_TRIGGER_PARAMETERS["source_arn"]
  }
}

module "cloudwatch-trigger" {
  source  = "./cloudwatch-trigger"
  CLOUDWATCH_TRIGGER_PARAMETERS = {
    lambda_name  = local.RESOURCE_NAME
    lambda_arn   = aws_lambda_function.lambda.arn
    rate         = var.LAMBDA_EXECUTION_FREQUENCY[var.ENV]["rate"]
    unity        = var.LAMBDA_EXECUTION_FREQUENCY[var.ENV]["unity"]
  }
}

module "event_source" {
  source = "./event-source"
  SETTINGS = {
    "event_source_arn"                   = var.LAMBDA_EVENT_SOURCE["event_source_arn"]
    "trigger"                            = var.LAMBDA_EVENT_SOURCE["trigger"]
    "starting_position"                  = var.LAMBDA_EVENT_SOURCE["starting_position"]
    "batch_size"                         = var.LAMBDA_EVENT_SOURCE["batch_size"]
    "maximum_batching_window_in_seconds" = var.LAMBDA_EVENT_SOURCE["maximum_batching_window_in_seconds"]
    "maximum_retry_attempts"             = var.LAMBDA_EVENT_SOURCE["maximum_retry_attempts"]
    "lambda_arn"                         = aws_lambda_function.lambda.arn
  }
}

resource "aws_lambda_function" "lambda" {
  function_name                  = local.RESOURCE_NAME
  description                    = var.LAMBDA_SETTINGS["description"]
  #handler                        = var.LAMBDA_SETTINGS["handler"]
  #runtime                        = var.LAMBDA_SETTINGS["runtime"]
  timeout                        = var.LAMBDA_SETTINGS["timeout"]
  memory_size                    = var.LAMBDA_SETTINGS["memory_size"]
  #layers                         = var.LAMBDA_LAYER
  package_type  = "Image"
  image_uri = "894486486413.dkr.ecr.us-east-1.amazonaws.com/company-ecr-ga-analytics-service-caller:latest"  # Replace with your ECR repository details

#  filename                       = module.package.output_path
#  source_code_hash               = module.package.output_base64sha256
  role                           = module.permissions.role-arn

  vpc_config {
    subnet_ids         = var.VPC_SETTINGS["vpc_subnets"]
    security_group_ids = var.VPC_SETTINGS["security_group_ids"]
  }

  environment {
    variables = var.LAMBDA_ENVIRONMENT_VARIABLES
  }

  tags = var.AWS_TAGS
}
