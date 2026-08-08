# Pega o ID da sua conta AWS automaticamente, pra garantir que o nome do
# bucket seja único no mundo todo (nomes de bucket S3 competem globalmente
# com todos os outros clientes AWS, não só dentro da sua conta).
data "aws_caller_identity" "current" {}

locals {
  bucket_name = "${var.project_name}-tfstate-${data.aws_caller_identity.current.account_id}"
}

# O bucket onde o terraform.tfstate do restante do projeto vai morar.
# O lock (evitar duas execuções simultâneas) é feito pelo próprio S3 via
# "use_lockfile = true" na configuração do backend — sem precisar de
# DynamoDB (Terraform >= 1.11).
resource "aws_s3_bucket" "tfstate" {
  bucket = local.bucket_name

  # Trava de segurança: "terraform destroy" nunca apaga esse bucket sem
  # remover essa linha manualmente antes. Perder o state é o pior cenário
  # possível num projeto Terraform.
  lifecycle {
    prevent_destroy = true
  }
}

# Versionamento: guarda o histórico de mudanças do state, como um Git do
# próprio arquivo de estado. Se um apply corromper o state, dá pra
# restaurar a versão anterior. Também é pré-requisito pro lock nativo do S3.
resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Criptografia dos dados em repouso (o state pode conter IDs de recursos e
# outras informações que não devem ficar em texto puro no S3).
resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Bloqueia qualquer possibilidade desse bucket ficar público por engano.
resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
