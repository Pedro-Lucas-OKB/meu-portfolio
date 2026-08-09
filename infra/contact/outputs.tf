output "api_invoke_url" {
  description = "URL de invocação da API (usada como VITE_CONTACT_API_URL no build do site)"
  value       = "https://${aws_api_gateway_rest_api.contact.id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_stage.contact.stage_name}/contato"
}

output "lambda_function_name" {
  description = "Nome da função Lambda publicada pelo CI (aws lambda update-function-code)"
  value       = aws_lambda_function.contact_form.function_name
}

output "lambda_function_arn" {
  description = "ARN da função Lambda"
  value       = aws_lambda_function.contact_form.arn
}

output "ses_email_identity" {
  description = "E-mail da identidade SES que precisa ser verificada (link no e-mail)"
  value       = aws_sesv2_email_identity.contact.email_identity
}
