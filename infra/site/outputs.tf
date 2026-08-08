output "site_bucket_name" {
  description = "Nome do bucket S3 onde o build do site deve ser enviado (usado depois no CI/CD)"
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "ID da distribuição CloudFront (usado depois no CI/CD para invalidar o cache)"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Endereço padrão do CloudFront (útil pra testar antes do DNS propagar)"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "route53_name_servers" {
  description = "Nameservers gerados pela hosted zone — copiar esses 4 valores para o painel do Registro.br"
  value       = aws_route53_zone.site.name_servers
}
