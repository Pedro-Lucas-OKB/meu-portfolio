# Portfólio Pessoal — Pedro Lucas — Planejamento

## Objetivo
Site portfólio pessoal para apoiar candidatura a vagas de dev back-end .NET,
hospedado na AWS como demonstração prática de habilidades em cloud.

## Escopo v1 (MVP)
- Site de uma página (hero, sobre, skills, experiências, projetos, contato)
- Stack: **React + Vite** (SPA, build estático — decisão tomada para reforçar React no currículo)
- Estilo: CSS Modules por componente, usando os tokens de design definidos abaixo
- Deploy: build (`npm run build`) → S3 (arquivos estáticos) + CloudFront (CDN/HTTPS) + ACM (certificado)
- Domínio: `pedrolucas.dev.br` (registrado no Registro.br, DNS gerenciado no Route 53 da AWS)
- CI/CD: GitHub Actions — build automático + sync com S3 + invalidação de cache do CloudFront a cada push na main

## Fase 2 (depois do v1 no ar)
- Formulário de contato conectado de verdade: API Gateway + Lambda (C#/.NET) + SES
- Meta: mostrar integração AWS end-to-end usando a própria linguagem do candidato (C#)

## Fora de escopo por enquanto
- Blog
- CMS/admin
- Banco de dados / comentários / contador de visitas

## Direção visual (tokens de design)
- **Conceito**: estética de terminal, mas não genérica — grounded no C#/.NET (roxo) e Linux Mint (verde sálvia), não no clichê "preto + verde neon".
- **Cores**: fundo `#14151c`, painel `#1c1e29`, texto `#e7e7ee`, texto secundário `#8b8fa3`, acento roxo `#8b7cf6`, acento sálvia `#6fcf97`, borda `#2c2e3d`.
- **Tipografia**: JetBrains Mono em toda a página (títulos pesados, corpo mais leve) — referência direta à IDE que o Pedro usa (Rider).
- **Estrutura/assinatura**: navegação como comandos de terminal reais (`cd sobre`, `ls projetos`, `cat contato.md`); projetos exibidos como listagem de diretório (`ls -la`); efeito de digitação único no carregamento do hero, respeitando `prefers-reduced-motion`.

## Conteúdo (fonte: currículo, ago/2026)
- **Nome**: Pedro Lucas da Costa Vidal — usar nome completo em `<title>`/SEO; "Pedro Lucas" nos demais locais visuais (rodapé, etc.)
- **Resumo**: dev .NET, ~2 anos de experiência, líder de dev no LearningLab (+1300 usuários potenciais), Clean Architecture/DDD/SOLID
- **Formação**: Ciência da Computação — UFC (2019–2026)
- **Projetos em destaque**: Simplified Bank (API financeira, Clean Architecture, row versioning), E-commerce Order Processing (RabbitMQ + microsserviços)
- **Contato**: pedrolucasep5100@gmail.com · github.com/pedro-lucas-okb · linkedin.com/in/pedrolucas-dev

## Estrutura de pastas do repositório
```
meu-portfolio/
├── site/
│   ├── src/
│   │   ├── components/   # TerminalHero, About, Skills, Experience, Projects, ContactForm, Footer
│   │   ├── App.jsx
│   │   └── index.css     # variáveis globais (:root com os tokens)
│   ├── public/            # favicon.svg, icons.svg
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── infra/                 # Terraform (S3, CloudFront, ACM, Route 53) — planejamento abaixo
├── .github/workflows/      # pipeline de CI/CD (build + deploy)
├── planejamento.md         # este arquivo
├── AGENTS.md                # instruções pro agente de IA
└── README.md
```

## Decisões já tomadas (não reabrir sem motivo)
1. Stack: React + Vite (SPA), CSS Modules por componente — trocado de HTML puro para reforçar React no currículo.
2. Paleta e tipografia definidas acima — não trocar sem decisão explícita.
3. Domínio comprado no Registro.br, DNS gerenciado no Route 53.
4. Formulário de contato só vira funcional na Fase 2, via Lambda em C#.
5. CI/CD via GitHub Actions para build + deploy automático.
6. Infra declarada com **Terraform** (decidido em conjunto; ver seção de infra abaixo).

## Infra — Planejamento (Terraform)

Ferramenta escolhida: **Terraform** (IaC declarativo, padrão de mercado).
Nenhum recurso AWS real é criado sem confirmação explícita do usuário (geram
custo) e sem a conta AWS configurada. Credenciais vão como *secrets* do GitHub
Actions, nunca commitadas.

### Recursos a criar
| Recurso | Detalhes |
|---|---|
| Bucket S3 (ex: `pedrolucas-dev-br`) | hosting estático do build (`site/dist/`), acesso via CloudFront OAC |
| CloudFront | distribuição HTTPS com origem no S3, cache e invalidação |
| ACM | certificado `pedrolucas.dev.br` e `www` na região `us-east-1` (obrigatória para CloudFront) |
| Route 53 | hosted zone + registros alias A/AAAA do domínio raiz e `www` → CloudFront |

### Estrutura do `infra/`
```
infra/
├── main.tf          # provider AWS e recursos raiz
├── variables.tf     # região, domínio, etc.
├── outputs.tf       # bucket, distribution id
└── modules/
    ├── s3/
    ├── cloudfront/
    ├── acm/
    └── route53/
```

### Estado do Terraform
- Por enquanto: `terraform.tfstate` **local** (gitignored).
- Evolução futura: backend S3 remoto + lock DynamoDB, junto do CI/CD.

### Migração de DNS
- Domínio `pedrolucas.dev.br` hoje no Registro.br.
- Criar a hosted zone no Route 53 e apontar os servidores NS no Registro.br.

### CI/CD (GitHub Actions) — `.github/workflows/deploy.yml`
- Trigger: push na `main`.
- Steps: `npm ci` → `npm run build` → `aws s3 sync site/dist/` pro bucket →
  invalidação do cache do CloudFront.
- `terraform apply` roda manualmente (plan no CI) até termos backend remoto.
- Secrets no GitHub: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
  `CLOUDFRONT_DISTRIBUTION_ID`, `S3_BUCKET`.

### Ordem de execução (quando aprovado)
1. Configurar conta AWS + credenciais (local e secrets do GitHub).
2. Escrever o `infra/` (Terraform) e o workflow de CI/CD.
3. `terraform init` + `terraform apply` (S3, CloudFront, ACM, Route 53).
4. Migrar DNS no Registro.br para a hosted zone.
5. Validar HTTPS, cache e redirect do `www`.

## Status atual
- [x] Protótipo v1 do `index.html` criado com conteúdo real
- [x] Port do site para React + Vite (CSS Modules + design tokens)
- [x] Componentes: TerminalHero, About, Skills, Experience, Projects, ContactForm, Footer
- [x] Tokens de design em `site/src/index.css` (`:root`), incluindo grade de pontos no fundo
- [x] Favicon simples (`site/public/favicon.svg`)
- [x] Responsividade mobile revisada (~375px, ~768px, ~1200px)
- [x] Animações: whoami no load + títulos de seção digitando no scroll (com fallback `prefers-reduced-motion`)
- [x] Scroll-spy no header (link da seção ativa em sage, com `aria-current`)
- [x] Formulário de contato visual (fake submit — conectado na Fase 2)
- [x] Passada formal de acessibilidade (h1 no hero, foco visível, reduced-motion, `aria-current`, autocomplete)
- [x] Planejamento de infra Terraform (seção acima)
- [ ] Migração de DNS do Registro.br para o Route 53
- [ ] Deploy S3 + CloudFront + ACM (recursos reais, com confirmação)
- [ ] CI/CD GitHub Actions (build + deploy)
- [ ] Fase 2: Lambda + API Gateway + SES para o formulário
