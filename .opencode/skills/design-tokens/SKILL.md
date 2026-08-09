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
| `--accent-danger` | `#e07b7b` | erro / estado de falha (ex: mensagens de erro do formulário) |
| `--border` | `#2c2e3d` | bordas e divisores |
| `--term-dot` | `#40414f` | pontos do "semáforo" da barra do terminal (decorativo) |
| `--bg-dot` | `rgba(44, 46, 61, 0.6)` | grade de pontos do fundo (derivada do `--border`, opacidade sutil-média) |

Não introduzir novas cores fora dessa paleta sem atualizar esta tabela primeiro.

## Tipografia
- **Única família**: JetBrains Mono (todos os pesos: 400, 500, 700, 800) —
  carregada via Google Fonts. Não misturar com fonte serifada ou sans-serif.
- Hierarquia vem de **peso e tamanho**, não de trocar de fonte:
  - Títulos de seção: peso 700–800, maior tamanho
  - Corpo de texto: peso 400
  - Labels/eyebrows/metadados: peso 500, tamanho menor (~12–13px), cor `--text-muted`

## Espaçamento
Sempre usar a escala abaixo (múltiplos de 4px) — nunca valores soltos tipo
`18px`, `22px`, `30px`. Se um espaçamento "quase serve" mas não é exato,
usar o valor da escala mais próximo, não inventar um intermediário.
 
| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | `4px` | espaço interno mínimo (entre ícone e texto, por ex.) |
| `--space-2` | `8px` | espaço entre elementos muito próximos (tag + tag) |
| `--space-3` | `12px` | padding interno pequeno |
| `--space-4` | `16px` | espaçamento padrão entre elementos de um mesmo bloco |
| `--space-6` | `24px` | padding interno de cards/painéis |
| `--space-8` | `32px` | espaço entre blocos dentro de uma seção |
| `--space-12` | `48px` | espaço entre seções (`sobre`, `projetos`, `contato`) |
| `--space-16` | `64px` | padding vertical de uma seção inteira |
 
## Escala de tamanho de texto
Também fixa, sem valores soltos:
 
| Token | Valor | Uso |
|---|---|---|
| `--text-xs` | `12px` | metadados, labels, tags |
| `--text-sm` | `14px` | texto secundário, botões |
| `--text-base` | `16px` | corpo de texto padrão |
| `--text-lg` | `20px` | subtítulos |
| `--text-xl` | `28px` | títulos de seção |
| `--text-2xl` | `40px` | título principal do hero |
 
`line-height` padrão: `1.5` pra corpo de texto, `1.2` pra títulos.
 
## Alinhamento e consistência entre componentes
- Todo container de seção usa o **mesmo `max-width`** e o **mesmo padding
  lateral** (defina uma vez, ex: um wrapper `.container` ou componente
  `<Section>`, reaproveitado em todo lugar — não repetir o valor em cada
  componente).
- Cards/painéis do mesmo tipo (ex: os itens da listagem de projetos) devem
  ter o mesmo padding interno, mesmo `border-radius`, mesma altura de
  cabeçalho — se um ficou diferente dos outros, é bug, não variação de design.
- Textos do mesmo papel semântico (todos os títulos de seção, por exemplo)
  usam sempre o mesmo token de `--text-*` — nunca um título de seção com
  tamanho custom só porque "ficou melhor assim".
- Testar visualmente pelo menos em três larguras: mobile (~375px), tablet
  (~768px) e desktop (~1200px) antes de considerar um componente pronto.

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
- Duas animações, ambas da mesma linguagem (digitação de terminal):
  - **Carregamento**: o "whoami" do hero digita ao abrir a página.
  - **Scroll**: os títulos de seção (que já são comandos, ex: `$ cat contato.md`)
    digitam uma única vez quando a seção entra no viewport — ritmo mais rápido
    que o do hero, e o cursor some quando o comando termina.
- Nada de scroll-jacking, parallax ou hover exagerado.
- Toda animação precisa ter fallback via `prefers-reduced-motion: reduce` —
  se o usuário tiver essa preferência ativada no SO, o texto completo é
  mostrado direto, sem digitação nem cursor.

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
