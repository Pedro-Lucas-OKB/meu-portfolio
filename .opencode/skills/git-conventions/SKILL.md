---
name: git-conventions
description: Use esta skill sempre que criar commits, branches, tags ou pull requests neste repositório — define o padrão de mensagens de commit, nomenclatura de branches e checklist antes de mergear na main. Consulte antes de fazer qualquer commit.
---

# Convenções de Git — Portfólio Pedro Lucas

## Mensagens de commit — Conventional Commits
Formato: `tipo(escopo opcional): descrição curta no imperativo`

| Tipo | Quando usar |
|---|---|
| `feat` | nova funcionalidade ou componente visual |
| `fix` | correção de bug ou comportamento incorreto |
| `style` | mudança visual/CSS que não é bug (cor, espaçamento, animação) |
| `refactor` | reorganização de código sem mudar comportamento |
| `docs` | mudanças em `planejamento.md`, `AGENTS.md`, `README.md`, skills |
| `chore` | configuração, dependências, tooling (ex: setup do Vite) |
| `ci` | mudanças em `.github/workflows/` |
| `test` | adição/ajuste de testes |

Exemplos:
```
feat(hero): adiciona efeito de digitação no TerminalHero
fix(contact-form): corrige validação de email
docs: atualiza planejamento com decisão de stack React
ci: adiciona pipeline de build e deploy no GitHub Actions
```

Regra prática: se a descrição não cabe numa linha de até ~72 caracteres sem
enrolar, o commit provavelmente está grande demais — considere quebrar em
commits menores.

## Granularidade dos commits
- Um commit = uma mudança lógica. Não misturar `feat` com `fix` não
  relacionado no mesmo commit.
- Preferir vários commits pequenos e sequenciais a um commit enorme "final".
  Isso facilita revisar o histórico depois (inclusive pra você mesmo entender
  o que o agente fez em cada etapa).
- Nunca commitar código que não builda/roda — cada commit deve deixar o
  projeto num estado funcional.

## Branches
- `main` é a branch estável — é o que o pipeline de CI/CD vai eventualmente
  fazer deploy quando houver push nela.
- Trabalhar em branches de feature, mesmo em projeto solo: `feat/nome-da-coisa`,
  `fix/nome-do-bug`, `chore/nome-da-tarefa`. Exemplo: `feat/terminal-hero`,
  `chore/setup-vite`.
- Mergear na `main` **somente quando o usuário pedir explicitamente**, depois
  de ele conferir visualmente (checklist abaixo). Nunca apagar a branch por
  conta própria — o merge e a remoção da branch dependem da confirmação do
  usuário.

## Antes de mergear na main (checklist)
- [ ] `npm run dev` roda sem erro
- [ ] A aparência bate com o que foi combinado em `design-tokens/SKILL.md`
- [ ] Nenhum arquivo sensível foi commitado (ver seção abaixo)
- [ ] A mensagem de commit segue o padrão Conventional Commits
- [ ] `AGENTS.md`/`planejamento.md` atualizados se a mudança alterar alguma
      decisão documentada lá
- [ ] O usuário conferiu e pediu explicitamente o merge (e a remoção da branch)

## O que nunca commitar
- `node_modules/`, `dist/` — devem estar no `.gitignore`
- `.env` ou qualquer arquivo com credenciais AWS, chave de API, e-mail/senha
  do SES — quando a Fase 2 (Lambda + SES) começar, credenciais AWS vão como
  *secrets* do GitHub Actions, nunca hardcoded ou commitadas
- Arquivos de build/cache do editor (`.vite/`, `.DS_Store`, etc.)

Um `.gitignore` mínimo pro projeto:
```
node_modules/
dist/
.env
.env.local
.DS_Store
```

## Tags de versão
Quando o site for pro ar pela primeira vez e a cada mudança significativa
depois do deploy inicial, criar uma tag semântica (`git tag v1.0.0`). Isso
ajuda a rastrear qual versão do código está de fato publicada em produção,
principalmente útil quando o CI/CD automatizar o deploy.

## Pull Requests (mesmo sendo projeto solo)
Mesmo sem outra pessoa revisando, abrir PR de `feat/*`/`fix/*` para `main`
antes de mergear é uma boa prática — força uma revisão própria do diff antes
de ir pra branch estável, e deixa o histórico do GitHub documentando a
evolução do projeto (bom pra mostrar em entrevista, inclusive).
