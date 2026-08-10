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
  default     = "Pedro-Lucas-OKB/meu-portfolio"
}

variable "github_sub_claim" {
  description = <<-EOT
    Formato do sub claim no trust policy. Repos criados a partir de 15/07/2026
    emitem o formato imutável com os IDs numéricos: repo:OWNER@OWNER_ID/REPO@REPO_ID:...
    Sem os IDs (formato legado), o AssumeRoleWithWebIdentity falha com
    "Not authorized to perform sts:AssumeRoleWithWebIdentity".
  EOT
  type        = string
  default     = "repo:Pedro-Lucas-OKB@73808163/meu-portfolio@1324452047:ref:refs/heads/main"
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
