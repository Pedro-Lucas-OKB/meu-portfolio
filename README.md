# Portfólio — Pedro Lucas Vidal

Site portfólio pessoal de **Pedro Lucas da Costa Vidal**, desenvolvedor Back-end
.NET (~2 anos de experiência) e líder de dev em um projeto com mais de 1300
usuários potenciais. Graduado em Ciência da Computação pela UFC (2019–2026).

O site apoia a candidatura a vagas de dev back-end .NET e, quando hospedado na
AWS, demonstra habilidades práticas em cloud. A identidade visual segue uma
estética de terminal "grounded" no C#/.NET (roxo) e Linux Mint (verde sálvia),
com navegação por comandos (`cd ./sobre`, `ls ./projetos`, `cat contato.md`).

## Stack

- **React 19 + Vite** (SPA, build estático) em `site/`
- **CSS Modules** por componente (um `.module.css` por componente)
- **Design tokens** globais em `site/src/index.css` (`:root`)
- **JetBrains Mono** (Google Fonts) como fonte única
- Sem `react-router` (página única, navegação por âncora) e sem estado externo
- Lint com **oxlint** (não ESLint); sem suíte de testes

## Como rodar localmente

Pré-requisito: Node.js e npm instalados.

```bash
cd site
npm install     # instalar dependências
npm run dev     # servidor de desenvolvimento (Vite)
```

Build de produção e preview:

```bash
npm run build     # gera o build estático em dist/
npm run preview   # serve o build localmente
npm run lint      # linter (oxlint)
```

Não há suíte de testes. Verificação: `lint` → `build` → conferência visual no
navegador (incluindo viewport mobile no DevTools).

## Estrutura de pastas

```
meu-portifolio/
├── site/
│   ├── src/
│   │   ├── components/   # TerminalHero, About, Projects, ContactForm, Footer
│   │   ├── App.jsx
│   │   └── index.css     # design tokens globais (:root)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── infra/                # planejado: S3 + CloudFront + ACM + Route 53
├── .github/workflows/    # planejado: pipeline de CI/CD
├── planejamento.md       # escopo, decisões e conteúdo do projeto
└── README.md
```

Componentes já portados: `TerminalHero`, `About`, `Projects`, `ContactForm` e
`Footer`. O formulário de contato é apenas visual (fake submit) por enquanto.

## Próximos passos (roadmap)

- [x] Port do protótipo para componentes React (v1)
- [x] Favicon condizente com a identidade visual
- [ ] Revisão de responsividade mobile
- [ ] Validação de acessibilidade básica (contraste, navegação por teclado, foco)
- [ ] **Deploy na AWS** — S3 (estáticos) + CloudFront (CDN/HTTPS) + ACM
      (certificado), com DNS no Route 53, para o domínio `pedrolucas.dev.br`
- [ ] **CI/CD** — GitHub Actions: build + sync com S3 + invalidação de cache do
      CloudFront a cada push na main
- [ ] **Fase 2** — formulário de contato funcional via API Gateway + Lambda
      (C#/.NET) + SES

## Contato

- E-mail: pedrolucasep5100@gmail.com
- GitHub: github.com/pedro-lucas-okb
- LinkedIn: linkedin.com/in/pedrolucas-dev
