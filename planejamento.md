# Portfólio Pessoal — Pedro Lucas — Planejamento

## Objetivo
Site portfólio pessoal para apoiar candidatura a vagas de dev back-end .NET,
hospedado na AWS como demonstração prática de habilidades em cloud.

## Escopo v1 (MVP)
- Site de uma página (header sticky, hero, sobre, skills, experiências, projetos, contato)
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
- Subdomínio `www` — decidido que **não** vai ter (só o domínio raiz)

## Direção visual (tokens de design)
- **Conceito**: estética de terminal, mas não genérica — grounded no C#/.NET (roxo) e Linux Mint (verde sálvia), não no clichê "preto + verde neon".
- **Cores**: fundo `#14151c`, painel `#1c1e29`, texto `#e7e7ee`, texto secundário `#8b8fa3`, acento roxo `#8b7cf6`, acento sálvia `#6fcf97`, borda `#2c2e3d`, grade de pontos de fundo `--bg-dot`.
- **Tipografia**: JetBrains Mono em toda a página (títulos pesados, corpo mais leve) — referência direta à IDE que o Pedro usa (Rider).
- **Escala de espaço/texto**: tokens `--space-1..16` e `--text-xs..2xl` aplicados em todos os componentes (ver `.opencode/skills/design-tokens/SKILL.md`).

## Seções do site e suas metáforas
- **Header**: sticky, marca `pedro-lucas@portfolio: ~` à esquerda, links de âncora à direita (com scroll-spy); colapsa num toggle "tag de terminal" no mobile.
- **Hero (terminal)**: barra `pedro-lucas@portfolio: ~`; `whoami` digita o nome "Pedro Lucas" (peso 800); cargo estático abaixo; navegação por comandos (`cd sobre`, `ls skills`, `ls projetos`, `cat contato.md`).
- **Skills**: `$ ls ./skills`, agrupada por categoria, só texto (sem logos, decisão do usuário).
- **Experiências**: metáfora `$ git log ./experiências` — commits em acordeão, nós `*` alinhados à esquerda (sem barras de ramificação), badges de conquista todos em sage, expandido por padrão.
- **Projetos**: listagem estilo `ls -la`.
- **Contato**: ícones inline (SVG, sem dependência nova) + link alinhado à direita dentro de card full-width; formulário ainda não envia de verdade (Fase 2).
- Títulos de seção (que já são comandos) digitam uma vez ao entrar no viewport (scroll), mesma linguagem do efeito do hero, com fallback `prefers-reduced-motion`.

## Conteúdo (fonte: currículo, ago/2026)
- **Nome**: Pedro Lucas da Costa Vidal — usar nome completo em `<title>`/SEO; "Pedro Lucas" nos demais locais visuais (rodapé, etc.)
- **Resumo**: dev .NET, ~2 anos de experiência, líder de dev no LearningLab (+1300 usuários potenciais), Clean Architecture/DDD/SOLID
- **Formação**: Ciência da Computação — UFC (2019–2026)
- **Projetos em destaque**: Simplified Bank (API financeira, Clean Architecture, row versioning), E-commerce Order Processing (RabbitMQ + microsserviços)
- **Contato**: pedrolucasep5100@gmail.com · github.com/pedro-lucas-okb · linkedin.com/in/pedrolucas-dev

## Estrutura de pastas do repositório
```
meu-portfolio/
├── local_files/            # NÃO versionado (.gitignore) — material de referência
│   ├── index.html           # protótipo original (visual/conteúdo)
│   └── curriculo.pdf        # currículo (contém dados pessoais)
├── site/
│   ├── src/
│   │   ├── components/   # TerminalHero, About, Skills, Experience, Projects, ContactForm, Footer, Icons
│   │   ├── App.jsx
│   │   └── index.css     # variáveis globais (:root com os tokens)
│   ├── public/            # favicon.svg
│   ├── index.html         # entry point do Vite
│   ├── package.json
│   └── vite.config.js
├── infra/
│   ├── bootstrap/          # cria só o bucket de state do Terraform (aplicado 1x)
│   └── site/               # S3 + CloudFront + ACM + Route 53 (sem submódulos)
├── .github/workflows/      # pipeline de CI/CD (a escrever)
├── .gitignore
├── planejamento.md         # este arquivo
├── AGENTS.md                # instruções pro agente de IA
└── README.md
```

## Decisões já tomadas (não reabrir sem motivo)
1. Stack: React + Vite (SPA), CSS Modules por componente.
2. Paleta, tipografia e escala de espaço/texto definidas acima.
3. Domínio comprado no Registro.br, DNS gerenciado no Route 53.
4. Formulário de contato só vira funcional na Fase 2, via Lambda em C#.
5. CI/CD via GitHub Actions, autenticando na AWS via **OIDC** (sem access key fixa como secret).
6. Seção de Skills sem logos, só texto.
7. Experiências usa a metáfora `git log` (nós simples, sem barras de ramificação); badges de conquista sempre em sage.
8. Ícones de contato são SVG inline (sem biblioteca de ícones); link de contato alinhado à direita dentro do card.
9. Nunca mergear na `main`, apagar branch, nem rodar `terraform apply`/`destroy` sem confirmação explícita do usuário.
10. Sem foto no site.
11. Coluna centralizada (max-width 760px); fundo com grade de pontos sutil-média.
12. Links de contato empilham no mobile (≤480px).
13. Animações: `whoami` no load do hero + títulos de seção digitam uma vez no scroll — ambas com fallback `prefers-reduced-motion`.
14. Scroll-spy no header: link ativo em sage, `aria-current="true"`, nenhum ativo no topo.
15. **Terraform** escolhido pra infra, com **lock nativo do S3** (`use_lockfile`), sem DynamoDB.
16. Estrutura de infra simplificada: `infra/bootstrap/` + `infra/site/` + `infra/oidc/`, sem pasta `modules/`.
17. Conta AWS no **Paid Plan** (evita fechamento automático em 6 meses do Free Plan).
18. CI/CD via GitHub Actions autenticando por **OIDC** (sem access key fixa); role com permissão mínima (S3 list/put/delete no bucket do site + `cloudfront:CreateInvalidation`); trust policy restrita à `main` e ao workflow `deploy.yml`.
19. **CI nunca aplica Terraform automaticamente** — mudanças de infraestrutura continuam manuais (`terraform apply` por módulo, com confirmação), só o deploy do site é automático.
20. **Lição registrada**: repositórios GitHub criados após 15/07/2026 recebem o `sub` claim *imutável* do OIDC (`repo:OWNER@OWNER_ID/REPO@REPO_ID:...`, com IDs numéricos), não o formato legado por nome. Trust policies de OIDC precisam usar esse formato — descoberto via um workflow de debug temporário, removido após confirmar.
21. **Fase 2**: Lambda em **C#/.NET 10** (`dotnet10`, AL2023 — LTS até nov/2028; .NET 8 deprecia em nov/2026) — **o código .NET é implementado pelo Pedro**, o agente só auxilia.
22. **Fase 2**: publicar o código da Lambda via **CI** (`dotnet publish` → zip → `aws lambda update-function-code`), espelhando o deploy do site; infra fica no Terraform (`infra/contact/`).
23. **Fase 2**: SES com **identidade de e-mail verificada** (`pedrolucasep5100@gmail.com`) em modo sandbox — suficiente porque o destino é sempre o próprio e-mail do Pedro.
24. **Fase 2**: frontend chama a **URL direta do API Gateway** (build-time env `VITE_CONTACT_API_URL`), sem rota `/api` no CloudFront.

## Infra provisionada (estado real, ago/2026)
- Bucket de state do Terraform: `pedrolucas-portfolio-tfstate-<ACCOUNT_ID>` (ver `terraform output` localmente)
- Bucket do site: `pedrolucas.dev.br`
- CloudFront distribution ID: `E24R25N80WOKZ9`
- CloudFront domain: `d3vri31xkbbzun.cloudfront.net`
- Hosted zone Route 53 criada; nameservers já atualizados no Registro.br
- Módulo `infra/oidc/`: OIDC Identity Provider do GitHub + role `pedrolucas-portfolio-gh-actions` (permissão mínima, trust restrita à `main` + `deploy.yml`)
- **Deploy automático no ar**: push na `main` → lint → build → OIDC → sync S3 → invalidação CloudFront

## Fase 2 — planejamento do formulário de contato

> Implementação do código C# da Lambda é **do Pedro** (sua stack). O agente
> auxilia em arquitetura, infra (Terraform), CI/CD, frontend e integração.

### Fluxo
```
form (React) → POST JSON → API Gateway (POST /contato, CORS) → Lambda C#/.NET 10
             → valida → SES SendEmail → resposta 200/400
```

### Arquitetura (recursos AWS)
- **API Gateway REST**: recurso `POST /contato` (JSON) + CORS (origem
  `https://pedrolucas.dev.br`) + throttling (rate/burst) + deployment/stage.
- **Lambda** `contact-form`: runtime `dotnet10`, ARM64, AL2023, timeout ~10s,
  memória ~256MB. Código inicial é um placeholder (o CI publica o código real).
- **IAM role da Lambda**: `ses:SendEmail` (na identidade SES) + CloudWatch logs
  (`AWSLambdaBasicExecutionRole`).
- **SES**: identidade de **e-mail** verificada `pedrolucasep5100@gmail.com` (modo
  sandbox é suficiente, pois o destino é sempre esse e-mail). Envio From/To para
  o mesmo endereço.

### Infra — novo módulo `infra/contact/` (Terraform, apply manual)
Mesmo padrão dos demais módulos (backend `contact/terraform.tfstate`, lock S3,
provider AWS ~5.92). Cria API Gateway, Lambda, role/policy, identidade SES e a
permissão da API invocar a Lambda. `lifecycle { ignore_changes }` no código da
função para o Terraform não reverter o que o CI publica.

### CI/CD
- Estender a role do CI (`infra/oidc/`) com `lambda:UpdateFunctionCode` escopado
  à função de contato (apply manual + confirmação).
- Job no workflow: setup .NET → `dotnet publish -c Release` →
  zip → `aws lambda update-function-code`.
- `VITE_CONTACT_API_URL` como **variável** do GitHub Actions (não é secret),
  injetada no build do site.

### Frontend (React)
- `ContactForm.jsx`: POST real para a API, estados idle/loading/success/error,
  campo **honeypot** oculto (`website`) e fallback do `mailto:`.
- Nota do formulário deixa de mencionar "fake" após a Fase 2 no ar.

### Contrato da API (para o Pedro implementar na Lambda)
- `POST /contato` → body `{ "nome": string, "email": string, "mensagem": string, "website": string }`
- Validação: `nome` 1–120; `email` válido e ≤ 254; `mensagem` 1–5000;
  `website` deve vir **vazio** (honeypot → descartar em silêncio); campos
  desconhecidos ignorados.
- Respostas (com headers CORS):
  - `200`/`202`: `{ "message": "Mensagem enviada." }`
  - `400`: `{ "errors": ["..."] }`
  - `500`: `{ "message": "Erro interno." }`
- E-mail via SES: From/To `pedrolucasep5100@gmail.com`, subject
  `Contato do portfólio: <nome>`, corpo com nome/email/mensagem.

### Checklist de implementação
- [ ] (Pedro) Projeto C# `functions/ContactForm/` (net10.0) conforme o contrato
- [ ] (agente) Módulo `infra/contact/` + apply manual com confirmação
- [ ] (agente) Estender role do CI (`lambda:UpdateFunctionCode`) + apply
- [ ] (agente) Workflow CI para publicar a Lambda + variável da URL da API
- [ ] (agente) Frontend: conectar `ContactForm` à API (estados + honeypot)
- [ ] Verificar identidade SES (link no e-mail), teste ponta a ponta

## Status atual
- [x] v1 completo: header com scroll-spy, hero, sobre, skills, experiências, projetos, contato (form fake), footer, animações, favicon, acessibilidade básica, responsividade
- [x] `main` pushada para `origin/main`
- [x] Conta AWS criada (Paid Plan), MFA no root, usuário IAM administrativo, CLI configurado
- [x] Domínio `pedrolucas.dev.br` registrado e DNS delegado pro Route 53
- [x] Bootstrap do Terraform aplicado (bucket de state, sem DynamoDB)
- [x] Infra principal aplicada: S3 + CloudFront + ACM + Route 53 — **site no ar**
- [x] Build enviado manualmente pro S3 e validado (primeira verificação, antes do CI/CD)
- [x] Workflow de CI/CD (OIDC + `.github/workflows/deploy.yml`) — **deploy automático funcionando**
- [x] README atualizado refletindo deploy e CI/CD reais (skill `create-readme`)
- [ ] Lambda + API Gateway + SES para o formulário de contato (Fase 2)
- [ ] Decidir destino das branches já mergeadas (apagar ou manter) — só com confirmação do usuário