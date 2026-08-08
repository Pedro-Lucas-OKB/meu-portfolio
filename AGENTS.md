# AGENTS.md — instruções para o agente de IA

Contexto completo do projeto (conteúdo, decisões, escopo v1 vs Fase 2, infra
provisionada) está em `planejamento.md`. Leia antes de qualquer tarefa. Este
arquivo é sobre *como* trabalhar, não *o quê*.

## Stack atual
- Front-end: React 19 + Vite (SPA, build estático) em `site/`
- Estilo: CSS Modules por componente (um `.module.css` por componente)
- Design tokens globais em `site/src/index.css` (`:root`), incluindo escala
  de espaço (`--space-*`) e texto (`--text-*`)
- Sem `react-router` (página única, navegação por âncora + header sticky) e
  sem gerenciador de estado externo — useState/useEffect bastam
- Ícones: SVG inline em `src/components/Icons/Icons.jsx` — sem biblioteca externa
- Infra: Terraform em `infra/bootstrap/` e `infra/site/` (sem submódulos)
- Linter: **oxlint** (não ESLint), config em `site/.oxlintrc.json`
- Sem suíte de testes — verificação é lint → build → checagem visual no navegador

## Estado atual (verifique antes de assumir o contrário)
- Site React **completo e no ar**: `pedrolucas.dev.br`, servido via
  CloudFront + S3, com HTTPS válido (ACM) e DNS no Route 53.
- **Deploy é automático**: push na `main` dispara `.github/workflows/deploy.yml`
  (lint → build → autenticação OIDC → sync S3 → invalidação CloudFront). Não
  fazer deploy manual a não ser pra debugar algo pontual.
- Infra provisionada por Terraform em três módulos: `infra/bootstrap/`,
  `infra/site/` e `infra/oidc/` (provider OIDC do GitHub + role de deploy,
  permissão mínima, trust restrita à `main` + `deploy.yml`).
- **CI nunca aplica Terraform** — mudanças de infraestrutura continuam
  manuais, com confirmação do usuário antes de qualquer `apply`.
- Repositório tem commits na `main`. Trabalhar em branches de feature e só
  mergear/apagar branch com confirmação explícita do usuário.

## Comandos (rodar dentro de `site/`)
- `npm run dev` — servidor local
- `npm run build` — build de produção (`dist/`)
- `npm run preview` — preview do build
- `npm run lint` — oxlint

## Deploy manual (só para debug pontual — o normal é o CI/CD automático)
```
cd site/
npm run build
aws s3 sync dist/ s3://pedrolucas.dev.br --delete
aws cloudfront create-invalidation --distribution-id E24R25N80WOKZ9 --paths "/*"
```

## Convenções
- Um componente por pasta em `site/src/components/`, com seu próprio `.module.css`
- Cores, espaçamentos e tamanhos de texto **sempre** via `var(--token)` —
  nunca hardcodar valor solto (ver skill `design-tokens`)
- Fonte única: JetBrains Mono — não misturar com sans/serif
- Toda animação precisa respeitar `prefers-reduced-motion`
- Commits pequenos e descritivos (Conventional Commits) — seguir a skill
  `git-conventions` antes de qualquer commit
- `local_files/index.html` (fora do controle de versão) é referência
  histórica — o site real já foi portado pra componentes

## Regra crítica — branches, merge e infraestrutura
**Nunca mergear na `main`, apagar branch, ou rodar `terraform apply`/
`terraform destroy` por conta própria.** Deixar pronto e parar, aguardando
confirmação explícita do usuário — mudanças de infraestrutura real na AWS
geram custo e não são reversíveis como um `git revert`. Essa regra já foi
violada uma vez (merge sem autorização) — não repetir.
- Branches de feature: `feat/*`, `fix/*`, `style/*`, `chore/*`, `docs/*`.

## Skills obrigatórias
- `design-tokens` — antes de criar/editar qualquer componente visual (React/CSS)
- `git-conventions` — antes de commits, branches, tags ou PRs
- `react-frontend` — antes de estruturar/revisar componentes React (evita
  desalinhamento de tamanho/espaçamento entre componentes)

## Skills recomendadas (instaladas em `.agents/skills/`)
- `vercel-react-best-practices` — performance; muitas regras são específicas
  de Next.js/SSR e não se aplicam a este projeto (Vite SPA estática) —
  aplicar só o que for relevante (bundle size, re-renders, lazy loading)
- `frontend-design`
- `find-skills`

## Tarefas priorizadas
1. Planejar a Fase 2: Lambda (C#) + API Gateway + SES para o formulário de
   contato — aguardar planejamento específico antes de implementar
2. Decidir com o usuário se as branches já mergeadas (`feat/cicd-oidc`,
   `fix/oidc-sub-claim`, `docs/readme`, `chore/skill-create-readme`, entre
   outras) podem ser apagadas — **não apagar sem confirmação**
3. Quando o GitHub encerrar suporte a Node 20 nos runners, subir
   `node-version` pra 24 no `deploy.yml` (aviso não-bloqueante já aparece
   no run — não é urgente, só não esquecer)