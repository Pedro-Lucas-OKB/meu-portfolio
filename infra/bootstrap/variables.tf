variable "project_name" {
  description = "Prefixo usado no nome dos recursos deste projeto"
  type        = string
  default     = "pedrolucas-portfolio"
}

variable "aws_region" {
  description = "Região AWS onde os recursos de bootstrap serão criados"
  type        = string
  default     = "us-east-1"
}
