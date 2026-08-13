<div align="center">

<img src="./site/public/favicon.svg" width="96" alt="Favicon do portfólio" />

# Portfólio — Pedro Lucas

*Dev Back-end .NET · C# · AWS · React*

[![Site](https://img.shields.io/website?url=https%3A%2F%2Fpedrolucas.dev.br&style=flat-square&label=pedrolucas.dev.br)](https://pedrolucas.dev.br)
[![Deploy](https://github.com/Pedro-Lucas-OKB/meu-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pedro-Lucas-OKB/meu-portfolio/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-3c873a?style=flat-square)](https://nodejs.org)
[![Terraform](https://img.shields.io/badge/Terraform-%3E%3D1.11-7b42bc?style=flat-square)](https://www.terraform.io)

[Stack](#stack) • [Estrutura](#estrutura-de-pastas) • [Rodando localmente](#rodando-localmente) • [Deploy e CI/CD](#deploy-e-cicd) • [Roadmap](#roadmap)

</div>

Site portfólio pessoal de **Pedro Lucas da Costa Vidal**, desenvolvedor Back-end
.NET (~2 anos de experiência) e líder de dev em um projeto com mais de 1300
usuários potenciais. Graduado em Ciência da Computação pela UFC (2019–2026).

O site está **no ar** em [pedrolucas.dev.br](https://pedrolucas.dev.br) e apoia a
candidatura a vagas de dev back-end .NET. A identidade visual segue uma estética
de terminal "grounded" no C#/.NET (roxo) e Linux Mint (verde sálvia), com
navegação por comandos (`cd ./sobre`, `ls ./skills`, `cat contato.md`).

> [!NOTE]
> O deploy é 100% automático via GitHub Actions + AWS OIDC: a cada push na
> `main`, o site é buildado e publicado sem nenhuma access key fixa.

## Stack

**Front-end** (`site/`)
- **React 19 + Vite** (SPA, build estático)
- **CSS Modules** por componente (um `.module.css` por componente)
- **Design tokens** globais em `site/src/index.css` (`:root`) — cores, escala de
  espaço (`--space-*`) e texto (`--text-*`)
- **JetBrains Mono** como fonte única (referência à IDE Rider)
- Sem `react-router` (página única, navegação por âncora + scroll-spy) e sem
  estado externo (useState/useEffect bastam)
- Ícones **SVG inline** em `src/components/Icons` (sem biblioteca de ícones)
- Lint com **oxlint** (não ESLint); sem suíte de testes

**Back-end** (`functions/ContactForm/`)
- **Lambda em C#/.NET 10** (`dotnet10`, ARM64) — processa o formulário de contato
- **API Gateway REST** (`POST /contato`, CORS + throttling) expõe a Lambda
- **SES** envia o e-mail da mensagem (identidade `pedrolucasep5100@gmail.com`)
- Publicado via CI (`contact.yml`): `dotnet publish` → zip → `update-function-code`

**Infraestrutura e CI/CD**
- **Terraform** (infra como código) em `infra/`
- **AWS**: S3 (estáticos) + CloudFront (CDN/HTTPS) + ACM (certificado) + Route 53 (DNS)
- **GitHub Actions** com autenticação **OIDC** (sem access key como secret)

## Estrutura de pastas

```
meu-portfolio/
├── site/                       # SPA React 19 + Vite
│   ├── src/
│   │   ├── components/         # Header, TerminalHero, About, Skills, Experience,
│   │   │                       # Projects, ContactForm, Footer, SectionTitle, Icons
│   │   ├── App.jsx
│   │   └── index.css           # design tokens globais (:root)
│   ├── public/                 # favicon.svg, icons.svg, curriculo-pedro-lucas.pdf
│   └── package.json
├── functions/
│   └── ContactForm/            # Lambda do contato (C#/.NET 10)
├── infra/                      # Terraform (infra como código)
│   ├── bootstrap/              # bucket de state do Terraform (aplicado 1x)
│   ├── site/                   # S3 + CloudFront + ACM + Route 53
│   ├── oidc/                   # IAM OIDC provider + role de deploy do CI/CD
│   └── contact/                # API Gateway + Lambda + SES (formulário de contato)
├── .github/workflows/          # deploy.yml + contact.yml (push na main)
├── AGENTS.md                   # instruções para o agente de IA
├── planejamento.md             # escopo, decisões e conteúdo do projeto
└── README.md
```

## Rodando localmente

Pré-requisito: Node.js 24+ e npm.

```bash
cd site
npm install     # instalar dependências
npm run dev     # servidor de desenvolvimento (Vite)
```

Build de produção, preview e lint:

```bash
npm run build     # gera o build estático em dist/
npm run preview   # serve o build localmente
npm run lint      # linter (oxlint)
```

Não há suíte de testes. Verificação: `lint` → `build` → conferência visual no
navegador (incluindo viewport mobile ~375px, ~768px e ~1200px no DevTools).

## Deploy e CI/CD

A infraestrutura foi provisionada com Terraform (módulos em `infra/`), cada um
com seu próprio state num bucket S3 versionado.

O deploy do site é **automático**: um push na `main` dispara o workflow
`.github/workflows/deploy.yml`, que:

1. instala dependências com `npm ci` (Node 20, cache de dependências);
2. roda o lint (oxlint) e o build (`vite build`);
3. autentica na AWS via **OIDC** — o GitHub assume a role
   `pedrolucas-portfolio-gh-actions` sem access key fixa (trust policy restrita
   ao repo, à branch `main` e ao próprio workflow);
4. sincroniza o `dist/` com o bucket S3 (`aws s3 sync --delete`);
5. invalida o cache do CloudFront para o site atualizar na hora.

```text
push na main → lint/build (falha bloqueia o deploy) → assume role via OIDC
            → s3 sync → invalidação CloudFront → pedrolucas.dev.br atualizado
```

A Lambda do formulário de contato tem o próprio workflow
(`.github/workflows/contact.yml`), disparado quando há mudanças em `functions/`:
`dotnet publish` → zip → `aws lambda update-function-code`. A infraestrutura
(API Gateway, Lambda, SES) fica no Terraform (`infra/contact/`); o workflow só
publica o código da função existente.

> [!NOTE]
> O CI/CD não aplica Terraform: mudanças de infraestrutura (novos recursos AWS,
> políticas IAM, etc.) são feitas manualmente com `terraform apply` em cada
> módulo de `infra/`. Isso evita que um push altere a infra por engano.

## Roadmap

- [x] Port do protótipo para componentes React (v1)
- [x] Deploy na AWS: S3 + CloudFront + ACM + Route 53 em `pedrolucas.dev.br`
- [x] CI/CD: GitHub Actions com autenticação OIDC (build + sync + invalidação)
- [x] Fase 2 — formulário de contato funcional via API Gateway + Lambda
      (C#/.NET) + SES
- [x] Renomear repositório para `meu-portfolio`
- [x] Migrar para Node 24 no runner (Node 20 foi descontinuado)
- [ ] Cloudflare Turnstile no formulário de contato (anti-bot)

## Contato

- E-mail: pedrolucasep5100@gmail.com
- GitHub: github.com/pedro-lucas-okb
- LinkedIn: linkedin.com/in/pedrolucas-dev
- Currículo: [curriculo-pedro-lucas.pdf](https://pedrolucas.dev.br/curriculo-pedro-lucas.pdf) (fonte: `site/public/`)
