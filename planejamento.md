# Portfólio Pessoal — Pedro Lucas — Planejamento

## Objetivo
Site portfólio pessoal para apoiar candidatura a vagas de dev back-end .NET,
hospedado na AWS como demonstração prática de habilidades em cloud.

## Escopo v1 (MVP)
- Site de uma página (hero, sobre, projetos, contato)
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
│   │   ├── components/   # TerminalHero, About, Projects, ContactForm, Footer
│   │   ├── App.jsx
│   │   └── index.css     # variáveis globais (:root com os tokens)
│   ├── index.html         # referência visual/conteúdo do protótipo original
│   ├── package.json
│   └── vite.config.js
├── infra/                 # scripts/config de deploy (S3, CloudFront, Route53, Lambda)
├── .github/workflows/      # pipeline de CI/CD
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

## Status atual
- [x] Protótipo v1 do `index.html` criado com conteúdo real
- [ ] Revisão de responsividade mobile
- [ ] Registro do domínio
- [ ] Deploy S3 + CloudFront + ACM
- [ ] Configuração Route 53
- [ ] Lambda + API Gateway + SES para o formulário
# Portfólio Pessoal — Pedro Lucas Vidal — Planejamento

## Objetivo
Site portfólio pessoal para apoiar candidatura a vagas de dev back-end .NET,
hospedado na AWS como demonstração prática de habilidades em cloud.

## Escopo v1 (MVP)
- Site de uma página (hero, sobre, projetos, contato)
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
│   │   ├── components/   # TerminalHero, About, Projects, ContactForm, Footer
│   │   ├── App.jsx
│   │   └── index.css     # variáveis globais (:root com os tokens)
│   ├── index.html         # referência visual/conteúdo do protótipo original
│   ├── package.json
│   └── vite.config.js
├── infra/                 # scripts/config de deploy (S3, CloudFront, Route53, Lambda)
├── .github/workflows/      # pipeline de CI/CD
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

## Status atual
- [x] Protótipo v1 do `index.html` criado com conteúdo real
- [ ] Revisão de responsividade mobile
- [ ] Registro do domínio
- [ ] Deploy S3 + CloudFront + ACM
- [ ] Configuração Route 53
- [ ] Lambda + API Gateway + SES para o formulário
