output "github_actions_role_arn" {
  description = "ARN da role que o workflow do GitHub Actions vai assumir via OIDC"
  value       = aws_iam_role.github_actions.arn
}

output "github_oidc_provider_arn" {
  description = "ARN do OIDC Identity Provider do GitHub"
  value       = aws_iam_openid_connect_provider.github.arn
}
