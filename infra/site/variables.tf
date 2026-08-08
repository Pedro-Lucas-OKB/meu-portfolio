variable "project_name" {
  description = "Prefixo usado no nome dos recursos deste projeto"
  type        = string
  default     = "pedrolucas-portfolio"
}

variable "aws_region" {
  description = "Região AWS onde os recursos serão criados. Precisa ser us-east-1 porque o certificado ACM usado pelo CloudFront só pode existir nessa região."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domínio raiz do site, já registrado no Registro.br"
  type        = string
  default     = "pedrolucas.dev.br"
}
