variable "project_name" {
  description = "Prefixo usado no nome dos recursos deste projeto"
  type        = string
  default     = "pedrolucas-portfolio"
}

variable "aws_region" {
  description = "Região AWS onde os recursos serão criados"
  type        = string
  default     = "us-east-1"
}

variable "github_repo" {
  description = "Repositório autorizado a assumir a role via OIDC (formato: dono/repo)"
  type        = string
  default     = "Pedro-Lucas-OKB/meu-portifolio"
}

variable "site_bucket" {
  description = "Bucket S3 do site (destino do sync do build)"
  type        = string
  default     = "pedrolucas.dev.br"
}

variable "cloudfront_distribution_id" {
  description = "ID da distribuição CloudFront a invalidar no deploy"
  type        = string
  default     = "E24R25N80WOKZ9"
}
