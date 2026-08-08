### S3 — onde os arquivos do build do React ficam guardados
# Esse bucket é PRIVADO. Ninguém acessa ele diretamente pela internet — só
# o CloudFront tem permissão de ler dele (configurado na bucket policy mais
# abaixo). É a forma recomendada hoje em dia, em vez do antigo "S3 Static
# Website Hosting" público.
resource "aws_s3_bucket" "site" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

### CloudFront Origin Access Control (OAC) — a "chave" que só o CloudFront
# tem, pra poder ler do bucket privado. Substitui o antigo OAI (Origin
# Access Identity), que está sendo descontinuado.
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

### Route 53 — a "agenda telefônica" que traduz pedrolucas.dev.br pro
# endereço técnico do CloudFront. Criar essa hosted zone é o que gera os
# 4 nameservers que você vai colar no painel do Registro.br.
resource "aws_route53_zone" "site" {
  name = var.domain_name
}

### ACM — o certificado que permite HTTPS no domínio. Validação por DNS:
# a AWS pede pra você provar que é dono do domínio criando um registro CNAME
# específico, o que fazemos automaticamente logo abaixo.
resource "aws_acm_certificate" "site" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Cria automaticamente o(s) registro(s) CNAME de validação que a ACM pediu,
# direto na hosted zone que acabamos de criar.
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = aws_route53_zone.site.zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

# Espera a AWS confirmar que o certificado foi validado antes de continuar
# (o CloudFront não aceita um certificado ainda "pending").
resource "aws_acm_certificate_validation" "site" {
  certificate_arn         = aws_acm_certificate.site.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

### CloudFront — a CDN que serve o site com HTTPS e cache
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = [var.domain_name]

  # PriceClass_100 = só edge locations da América do Norte e Europa.
  # Mais barato, e mais que suficiente pro público-alvo (recrutadores no
  # Brasil já são bem atendidos por essas regiões).
  price_class = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-site-origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-site-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods          = ["GET", "HEAD"]
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  # SPA em React: se alguém acessar uma rota que não existe como arquivo
  # físico no S3, devolve o index.html em vez de erro 404/403. Não é
  # necessário hoje (página única), mas evita dor de cabeça se você
  # adicionar react-router no futuro.
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

### Bucket policy — dá permissão pro CloudFront (e só ele, via OAC) ler os
# arquivos do bucket privado.
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid       = "AllowCloudFrontServicePrincipal"
      Effect    = "Allow"
      Principal = { Service = "cloudfront.amazonaws.com" }
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.site.arn}/*"
      Condition = {
        StringEquals = {
          "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
        }
      }
    }]
  })
}

### Route 53 — aponta o domínio pro CloudFront (registro tipo "alias",
# exclusivo da AWS, funciona como um CNAME mas pode ser usado no domínio raiz)
resource "aws_route53_record" "site_ipv4" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_ipv6" {
  zone_id = aws_route53_zone.site.zone_id
  name    = var.domain_name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
