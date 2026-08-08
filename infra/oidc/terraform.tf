terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.11"

  # Backend remoto no mesmo bucket de state criado pelo bootstrap, em uma
  # "pasta" própria deste módulo (key = oidc/terraform.tfstate).
  # Valores dentro de "backend" não aceitam variáveis do Terraform (limitação
  # da ferramenta), por isso o nome do bucket está escrito direto aqui.
  backend "s3" {
    bucket       = "pedrolucas-portfolio-tfstate-963990211877"
    key          = "oidc/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
