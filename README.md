# Portfolio — Luizinho Neto

Portfólio pessoal construído com **React + TypeScript + Vite**, com foco em experiência visual (animações, efeitos e navegação fluida) para apresentar projetos, trabalhos profissionais e galeria.

## Stack

- **Framework:** React 19
- **Build tool:** Vite 7
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Roteamento:** React Router
- **Animações:** GSAP, Lenis, Three.js + React Three Fiber
- **UI base:** componentes em `src/components/ui` (Radix + utilitários)

## Rotas da aplicação

- `/` → Home (Hero, Sobre, Projetos, Tech Stack, Contato)
- `/trabalhos` → Trabalhos realizados
- `/galeria` → Galeria do Instagram

## Conteúdo orientado a dados

Os dados principais estão em JSON e são renderizados pelas páginas/componentes:

- `src/content/projetos-destacados.json`
- `src/content/trabalhos-realizados.json`
- `src/content/galeria-instagram.json`

## Estrutura principal

```text
src/
  components/
    ui/
  content/
  hooks/
  lib/
  pages/
  sections/
  App.tsx
  main.tsx
```

## Como rodar localmente

Pré-requisito: **pnpm** instalado.

```bash
pnpm install
pnpm dev
```

Servidor local padrão:
- `http://localhost:5173`

## Teste remoto (Tailnet)

Este projeto já está configurado no Vite com:

- `server.allowedHosts: ["sundabot.tail17794.ts.net"]`

URL remota usada no ambiente:
- `http://sundabot.tail17794.ts.net`

## Scripts úteis

```bash
pnpm dev        # sobe ambiente de desenvolvimento
pnpm dev:open   # abre navegador e expõe host
pnpm build      # type-check + build de produção
pnpm preview    # preview do build localmente
pnpm lint       # lint com ESLint
```

## Deploy

Existe configuração de deploy em `vercel.json`.

---

Se quiser, na próxima etapa eu também atualizo este README com uma seção de contribuição (padrão de branch/PR e convenções de commit) para facilitar manutenção do projeto.