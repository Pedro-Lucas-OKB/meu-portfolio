variable "project_name" {
  description = "Prefixo usado no nome dos recursos deste projeto"
  type        = string
  default     = "pedrolucas-portfolio"
}

variable "aws_region" {
  description = "Região AWS onde os recursos serão criados (mesma do site: us-east-1)"
  type        = string
  default     = "us-east-1"
}

variable "site_origin" {
  description = "Origem (URL) que pode chamar a API — usada no CORS do API Gateway"
  type        = string
  default     = "https://pedrolucas.dev.br"
}

variable "ses_email" {
  description = "E-mail usado no SES (identidade verificada e remetente/destino do contato)"
  type        = string
  default     = "pedrolucasep5100@gmail.com"
}

variable "lambda_architecture" {
  description = "Arquitetura da Lambda (arm64 ou x86_64)"
  type        = string
  default     = "arm64"
}

variable "lambda_handler" {
  description = "Handler da função Lambda (Assembly::Type::Método)"
  type        = string
  default     = "ContactForm::ContactForm.Function::FunctionHandler"
}
