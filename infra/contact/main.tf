# Formulário de contato (Fase 2): API Gateway + Lambda (C#/.NET) + SES.
# Este módulo cria recursos reais na AWS — NÃO rodar `terraform apply`
# sem revisão e confirmação explícita do usuário.

# ── Lambda ────────────────────────────────────────────────────────────────

# A função começa com um zip placeholder; o CI publica o código real
# (dotnet publish → aws lambda update-function-code). Por isso o Terraform
# ignora mudanças no código — para um apply não reverter o que o CI publicou.
resource "aws_lambda_function" "contact_form" {
  function_name = "${var.project_name}-contact-form"
  role          = aws_iam_role.contact_lambda.arn
  runtime       = "dotnet10"
  handler       = var.lambda_handler
  architectures = [var.lambda_architecture]
  memory_size   = 256
  timeout       = 30

  filename         = "${path.module}/placeholder.zip"
  source_code_hash = filebase64sha256("${path.module}/placeholder.zip")

  environment {
    variables = {
      SES_FROM_ADDRESS = var.ses_email
      SES_TO_ADDRESS   = var.ses_email
    }
  }

  lifecycle {
    ignore_changes = [filename, source_code_hash]
  }
}

# ── IAM da Lambda ─────────────────────────────────────────────────────────

resource "aws_iam_role" "contact_lambda" {
  name = "${var.project_name}-contact-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "contact_lambda_basic_execution" {
  role       = aws_iam_role.contact_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_ses" {
  name = "ses-send-email"
  role = aws_iam_role.contact_lambda.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid      = "SendContactEmail"
      Effect   = "Allow"
      Action   = ["ses:SendEmail"]
      Resource = [aws_sesv2_email_identity.contact.arn]
    }]
  })
}

# ── SES ───────────────────────────────────────────────────────────────────

# Identidade de e-mail a ser verificada (o usuário clica no link recebido por
# e-mail). Modo sandbox é suficiente: o destino do contato é esse mesmo e-mail.
resource "aws_sesv2_email_identity" "contact" {
  email_identity = var.ses_email
}

# ── API Gateway ───────────────────────────────────────────────────────────

resource "aws_api_gateway_rest_api" "contact" {
  name        = "${var.project_name}-contact"
  description = "API do formulário de contato (POST /contato)"
}

resource "aws_api_gateway_resource" "contact" {
  rest_api_id = aws_api_gateway_rest_api.contact.id
  parent_id   = aws_api_gateway_rest_api.contact.root_resource_id
  path_part   = "contato"
}

# POST /contato → Lambda (AWS_PROXY)
resource "aws_api_gateway_method" "contact_post" {
  rest_api_id   = aws_api_gateway_rest_api.contact.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "contact_post" {
  rest_api_id             = aws_api_gateway_rest_api.contact.id
  resource_id             = aws_api_gateway_resource.contact.id
  http_method             = aws_api_gateway_method.contact_post.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.contact_form.invoke_arn
}

# CORS: preflight OPTIONS respondido pelo próprio API Gateway (MOCK), com os
# headers permitindo a origem do site.
resource "aws_api_gateway_method" "contact_options" {
  rest_api_id   = aws_api_gateway_rest_api.contact.id
  resource_id   = aws_api_gateway_resource.contact.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "contact_options_200" {
  rest_api_id = aws_api_gateway_rest_api.contact.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

resource "aws_api_gateway_integration" "contact_options" {
  rest_api_id       = aws_api_gateway_rest_api.contact.id
  resource_id       = aws_api_gateway_resource.contact.id
  http_method       = aws_api_gateway_method.contact_options.http_method
  type              = "MOCK"
  request_templates = { "application/json" = "{\"statusCode\": 200}" }
}

resource "aws_api_gateway_integration_response" "contact_options" {
  rest_api_id = aws_api_gateway_rest_api.contact.id
  resource_id = aws_api_gateway_resource.contact.id
  http_method = aws_api_gateway_method.contact_options.http_method
  status_code = aws_api_gateway_method_response.contact_options_200.status_code
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'OPTIONS,POST'"
    "method.response.header.Access-Control-Allow-Origin"  = "'${var.site_origin}'"
  }
}

# Permissão para o API Gateway invocar a Lambda.
resource "aws_lambda_permission" "contact_apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_form.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.contact.execution_arn}/*/*"
}

# ── Deploy e stage ────────────────────────────────────────────────────────

resource "aws_api_gateway_deployment" "contact" {
  rest_api_id = aws_api_gateway_rest_api.contact.id
  depends_on = [
    aws_api_gateway_integration.contact_post,
    aws_api_gateway_integration.contact_options,
  ]
  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_integration.contact_post.id,
      aws_api_gateway_method.contact_post.id,
      aws_api_gateway_resource.contact.id,
    ]))
  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "contact" {
  stage_name    = "prod"
  rest_api_id   = aws_api_gateway_rest_api.contact.id
  deployment_id = aws_api_gateway_deployment.contact.id
}

# Throttling básico: evita abuso de bots no endpoint público.
resource "aws_api_gateway_method_settings" "contact_throttling" {
  rest_api_id = aws_api_gateway_rest_api.contact.id
  stage_name  = aws_api_gateway_stage.contact.stage_name
  method_path = "*/*"
  settings {
    throttling_rate_limit  = 5
    throttling_burst_limit = 10
  }
}
