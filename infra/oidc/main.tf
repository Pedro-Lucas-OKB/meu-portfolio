# OIDC para o GitHub Actions autenticar na AWS sem access key.
# Este módulo cria recursos reais na AWS — NÃO rodar `terraform apply`
# sem revisão e confirmação explícita do usuário.

data "aws_caller_identity" "current" {}

locals {
  role_name = "${var.project_name}-gh-actions"

  # ARNs do bucket do site e da distribuição CloudFront (criados em infra/site).
  site_bucket_arn         = "arn:aws:s3:::${var.site_bucket}"
  site_bucket_objects_arn = "arn:aws:s3:::${var.site_bucket}/*"
  cloudfront_dist_arn     = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${var.cloudfront_distribution_id}"
}

# Identity Provider do GitHub (token.actions.githubusercontent.com).
# Desde julho/2023 a AWS valida o GitHub via biblioteca de CAs raiz confiáveis
# e ignora thumbprints; no provider >= 5.81.0 o thumbprint_list é opcional,
# então omitimos (a AWS obtém o thumbprint sozinha na criação).
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
}

# Role que o workflow assume via AssumeRoleWithWebIdentity. O trust policy
# restringe a autenticação a este repositório especificamente (qualquer
# branch/ref do repo), e não a qualquer repo do GitHub.
resource "aws_iam_role" "github_actions" {
  name = local.role_name
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
        StringLike = {
          "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
        }
      }
    }]
  })
}

# Permissões mínimas: escrever no bucket do site (s3 sync) e invalidar o
# CloudFront. Nada além disso — sem AdministratorAccess.
resource "aws_iam_role_policy" "deploy" {
  name = "deploy"
  role = aws_iam_role.github_actions.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "ListSiteBucket"
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = [local.site_bucket_arn]
      },
      {
        Sid      = "WriteSiteObjects"
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:DeleteObject"]
        Resource = [local.site_bucket_objects_arn]
      },
      {
        Sid      = "InvalidateCloudFront"
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = [local.cloudfront_dist_arn]
      }
    ]
  })
}
