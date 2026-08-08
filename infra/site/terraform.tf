terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.92"
    }
  }

  required_version = ">= 1.2"

  # Backend remoto: usa o bucket criado no bootstrap pra guardar o state
  # deste módulo (uma "pasta" dentro do bucket, definida pelo "key").
  # O lock é feito pelo próprio S3 (use_lockfile), sem DynamoDB.
  #
  # Atenção: valores dentro de "backend" não podem usar variáveis do
  # Terraform (é uma limitação da ferramenta) — por isso o nome do bucket
  # está escrito direto aqui, e não como var.state_bucket_name.
  backend "s3" {
    bucket       = "pedrolucas-portfolio-tfstate-963990211877"
    key          = "site/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
