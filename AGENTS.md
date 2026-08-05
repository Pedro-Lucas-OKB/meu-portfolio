# AGENTS.md — instruções para o agente de IA

Contexto completo do projeto (conteúdo, decisões, escopo v1 vs Fase 2) está em
`planejamento.md`. Leia antes de qualquer tarefa. Este arquivo é sobre *como*
trabalhar, não *o quê*.

## Stack atual
- Front-end: React 19 + Vite (SPA, build estático) em `site/`
- Estilo: CSS Modules por componente (um `.module.css` por componente)
- Design tokens globais em `site/src/index.css` (`:root`)
- Sem `react-router` (página única, navegação por âncora) e sem gerenciador de
  estado externo — useState/useEffect bastam

## Estado atual (verifique antes de assumir o contrário)
- `site/` ainda é o **template padrão do Vite** — o port do protótipo para os
  componentes (TerminalHero, About, Projects, ContactForm, Footer) **não foi
  feito**. Não existe `site/src/components/` ainda, e `site/src/index.css`
  contém o CSS padrão do Vite, não os tokens de design.
- `site/index.html` ainda é o default (lang="en", title="site") — precisa virar
  pt-BR com o nome completo ("Pedro Lucas da Costa Vidal") no `<title>`.
- Protótipo de referência (conteúdo + visual reais) é `local_files/index.html`.
  Portar para componentes, não redesenhar do zero.
- `infra/` e `.github/workflows/` estão **vazios** — CI/CD e deploy ainda não
  começaram. Não criar recursos AWS reais.
- Repositório sem commits ainda (branch `main` limpa).

## Comandos (rodar dentro de `site/`)
- `npm install` — instalar dependências (projeto ainda não commitado)
- `npm run dev` — servidor de desenvolvimento (Vite, porta padrão)
- `npm run build` — build de produção para `dist/`
- `npm run preview` — serve o build localmente
- `npm run lint` — linter é **oxlint** (não ESLint), config em `.oxlintrc.json`
- Não há framework de testes nem suíte — verificação é `lint` → `build` →
  conferência visual no navegador, incluindo viewport mobile (DevTools)

## Convenções
- Um componente por pasta em `site/src/components/`, com seu próprio `.module.css`
- Cores e espaçamentos **sempre** via `var(--token)` — nunca hardcodar hex num
  componente. Paleta e tipografia definidas em `planejamento.md` e na skill
  `design-tokens` (carregar essa skill antes de qualquer trabalho visual)
- Fonte única: JetBrains Mono (via Google Fonts) — não misturar com sans/serif
- Toda animação precisa respeitar `prefers-reduced-motion`
- Commits pequenos e descritivos (Conventional Commits), um por tarefa — seguir
  a skill `git-conventions` antes de qualquer commit

## O que NÃO fazer sem confirmar antes
- Não mudar a paleta de cores ou a tipografia definidas em `planejamento.md`
- Não implementar a Lambda de contato — é Fase 2, com planejamento próprio
  ainda não escrito. Formulário fica só visual (fake submit)
- Não decidir estrutura de infraestrutura AWS sozinho — seguir `planejamento.md`
- Não commitar `local_files/` (protótipo + PDF do currículo, dados pessoais).
  Apesar de os docs dizerem que está "fora do controle de versão", **não há
  `.gitignore` na raiz** — um `git add .` acabaria incluindo. Adicionar
  explicitamente o que for commitar

## Skills obrigatórias
- `design-tokens` — antes de criar/editar qualquer componente visual (React/CSS)
- `git-conventions` — antes de commits, branches, tags ou PRs

## Tarefas priorizadas (v1)
1. ~~Criar projeto Vite~~ (feito)
2. Portar conteúdo/visual de `local_files/index.html` para componentes React:
   TerminalHero, About, Projects, ContactForm, Footer
3. Mover os tokens de design (cores/tipografia) para `site/src/index.css`
4. Revisar responsividade mobile
5. Adicionar `favicon` simples condizente com a identidade visual
6. Validar acessibilidade básica: contraste, navegação por teclado, foco visível
7. Preparar `infra/` (S3 + CloudFront + ACM) — aguardar confirmação antes de
   criar recursos reais na AWS
8. Configurar CI/CD em `.github/workflows/` (build + deploy) — fase posterior
