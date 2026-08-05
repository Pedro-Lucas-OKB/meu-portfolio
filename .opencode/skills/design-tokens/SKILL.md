---
name: design-tokens
description: Use esta skill sempre que criar ou editar qualquer componente visual do portfólio (React/CSS) — define a paleta de cores, tipografia, espaçamento e o conceito de identidade visual do projeto. Consulte antes de escolher qualquer cor, fonte ou padrão de layout novo.
---

# Design Tokens — Portfólio Pedro Lucas

## Conceito
Estética de terminal, mas **não genérica**. Nada de "preto puro + verde neon"
(clichê de terminal) nem gradiente roxo/azul (clichê de site feito por IA).
A referência é o mundo real do Pedro: o roxo remete à cor do C#/.NET, o verde
sálvia remete ao Linux Mint (SO que ele usa), a fonte é a mesma da IDE dele
(JetBrains Mono, usada no Rider).

Qualquer decisão visual nova deve ser coerente com esse conceito — se não tem
relação com o mundo real do Pedro (suas ferramentas, sua stack), provavelmente
não é a escolha certa.

## Cores
Sempre usar como variáveis CSS (custom properties), nunca hex direto num componente.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#14151c` | fundo principal (quase-preto azulado, não preto puro) |
| `--bg-panel` | `#1c1e29` | fundo de cards/painéis (terminal, listagem de projetos) |
| `--bg-panel-soft` | `#191a24` | fundo de barras/cabeçalhos dentro de painéis |
| `--text` | `#e7e7ee` | texto principal |
| `--text-muted` | `#8b8fa3` | texto secundário, labels, metadados |
| `--accent-violet` | `#8b7cf6` | acento primário (nod ao C#/.NET) — links de destaque, tags, foco |
| `--accent-sage` | `#6fcf97` | acento secundário (nod ao Linux Mint) — prompts, sucesso, cursor |
| `--border` | `#2c2e3d` | bordas e divisores |
| `--term-dot` | `#40414f` | pontos do "semáforo" da barra do terminal (decorativo) |

Não introduzir novas cores fora dessa paleta sem atualizar esta tabela primeiro.

## Tipografia
- **Única família**: JetBrains Mono (todos os pesos: 400, 500, 700, 800) —
  carregada via Google Fonts. Não misturar com fonte serifada ou sans-serif.
- Hierarquia vem de **peso e tamanho**, não de trocar de fonte:
  - Títulos de seção: peso 700–800, maior tamanho
  - Corpo de texto: peso 400
  - Labels/eyebrows/metadados: peso 500, tamanho menor (~12–13px), cor `--text-muted`

## Layout e estrutura
- **Hero**: janela de terminal (barra com "semáforo" de três pontos + título),
  com efeito de digitação único no carregamento (não repetir a animação depois).
- **Navegação**: comandos de terminal reais e clicáveis (`cd sobre`, `ls
  projetos`, `cat contato.md`), não menu de botões genérico. O nome do comando
  precisa fazer sentido com o destino (não inventar comandos aleatórios).
- **Projetos**: exibidos como listagem de diretório (`ls -la`), com coluna de
  permissões fake (`drwxr-xr-x`) e o "nome do arquivo" sendo o nome do projeto.
- **Bordas**: `border-radius` pequeno (~6px), nunca cantos totalmente
  quadrados nem excessivamente arredondados — mantém o ar "técnico" sem ficar
  frio.

## Movimento
- Só uma animação orquestrada por carregamento de página (o "whoami" digitando
  no hero). Nada de scroll-jacking, parallax ou hover exagerado.
- Toda animação precisa ter fallback via `prefers-reduced-motion: reduce` —
  se o usuário tiver essa preferência ativada no SO, a animação deve ser
  pulada e o conteúdo final mostrado direto.

## Nome do Pedro
- Nome completo ("Pedro Lucas da Costa Vidal") em `<title>`/meta tags/SEO.
- "Pedro Lucas" em qualquer outro lugar visual (rodapé, assinaturas, etc.).

## Checklist antes de finalizar um componente novo
- [ ] Usei só cores da tabela acima (via `var(--token)`)?
- [ ] Usei só JetBrains Mono?
- [ ] Se adicionei animação, ela respeita `prefers-reduced-motion`?
- [ ] O elemento tem foco visível pra navegação por teclado?
- [ ] Isso parece "site genérico de IA" ou tem a cara do conceito de terminal
      do Pedro? Se parecer genérico, revisar antes de dar como pronto.
