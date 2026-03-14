# Vercel deployment analysis

URL analisada: `https://vercel.com/woowevents/kimi-portfolio/3sxrvsRxEHhXzQBaSpoDyyNCEH6a`

## Evidências coletadas

1. A URL responde com HTTP 200 para a página do dashboard da Vercel (não para um endpoint público de app), com `x-matched-path: /[teamSlug]/[project]/[id]`.
2. O HTML inicial inclui erros SSR de API:
   - `forbidden`: `The request is missing an authentication token`
   - `not_found`: `Deployment not found`
3. Também há warning explícito de fetch SSR:
   - `"/api/dashboard/deployments/dpl_3sxrvsRxEHhXzQBaSpoDyyNCEH6a?..."` retornando `Deployment not found`.

## Diagnóstico

O link do dashboard aponta para um deployment que **não está acessível no contexto atual** por dois motivos simultâneos:

- Sem autenticação, parte dos dados do dashboard é bloqueada (`missing authentication token`).
- Mesmo quando tenta resolver o deployment por ID (`dpl_3sxrvsRxEHhXzQBaSpoDyyNCEH6a`), a API responde `Deployment not found`.

Isso normalmente indica um dos cenários:

- deployment removido/expirado,
- ID inválido/truncado,
- projeto/time diferente do esperado,
- ou falta de permissão no time `woowevents` para visualizar esse deployment.

## Próximos passos sugeridos

1. Abrir o link logado na conta com acesso ao time `woowevents`.
2. Confirmar no painel de deployments do projeto `kimi-portfolio` se o ID `dpl_3sxrvsRxEHhXzQBaSpoDyyNCEH6a` existe.
3. Se não existir, obter o deployment válido mais recente e compartilhar:
   - URL de preview (`https://<deployment>.vercel.app`), e/ou
   - URL pública de produção.
4. Se existir mas continuar inacessível, revisar permissões de team/project e visibility do deployment.
