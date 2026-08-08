output "state_bucket_name" {
  description = "Nome do bucket S3 que guarda o state do restante do projeto"
  value       = aws_s3_bucket.tfstate.bucket
}

