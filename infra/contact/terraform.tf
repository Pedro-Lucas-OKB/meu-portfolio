terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.27"
    }
  }

  required_version = ">= 1.11"

  # Backend remoto no mesmo bucket de state criado pelo bootstrap, em uma
  # "pasta" própria deste módulo (key = contact/terraform.tfstate).
  backend "s3" {
    bucket       = "pedrolucas-portfolio-tfstate-963990211877"
    key          = "contact/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
