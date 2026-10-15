# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** <Hulgo Rafael>
**Login do GitHub:** <hulgo-ferreira>
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: <Usei o copilot para ajudar na criação de alguns comandos nunca usados, constantes e métodos para os testes. A estuturação do projeto poderia ser melhor, conforme foi feito na primeira entrega, mas resolvi manter o mesmo padrão que já estava.>  *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

<Porque o locator.count mede o estado em que se encontra naquele instante. Se a lista estiver sendo carregada, ela pode devolver 10, 11 ou 12 dependendo do momento que ela está ou seja, o timing e com isso o teste acaba falhando.>

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

<Porque no bloco C o objetivo é testar a lógica do app com uma resposta de rede controlada, ou seja, se o service worker estiver ativo, ele intercepta o fetch e pode devolver cache ou resposta antiga. No bloco E, o teste precisa validar o comportamento offline e o funcionamento do PWA. >

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

<O ganho é velocidade e estabilidade: a semente prepara o estado do app antes da página carregar, então o teste fica mais simples, sem depender da interação do usuário nem da UI do coração. Também reduz flakyness, porque evita problemas de renderização e debounce ao favoritar.
O risco é que a semente não prova que o clique do usuário funciona: ela valida só o estado persistido, não a UX real da interação, o botão de favorito e a sincronização da tela. Um caso claro é testar o fluxo de interação do botão em uma tela de detalhe ou em uma ação de toggle, onde o comportamento do clique e a atualização visual são o que importam.>

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

<Os defeitos eram: uso de waitForTimeout para “esperar” o app, contagem baseada em locator.count() que lê o estado instantâneo, e acoplamento entre testes por estado global (F1d dependia de um favorito deixado por outro teste). Isso criava flakiness, porque a execução era dependente do timing e da ordem.
Rodei esses comandos npx playwright test tests/desafios/06-flaky-cacada.spec.ts --project=chromium --repeat-each=10 Também validei o caso isolado do F1d com: npx playwright test tests/desafios/06-flaky-cacada.spec.ts --project=chromium --grep "F1d">

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

<Os mocks do Bloco C dão confiança na lógica do frontend: rota, carregamento, estado de erro, re-tentativa, e como a UI reage ao retorno esperado da API. Em outras palavras, eles validam que o app trata bem as respostas “bonitas” e os cenários de falha simulados. O bug que passaria batido é o do mundo real: contrato e formato divergentes, latência real, erro 500 com payload estranho. >

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

<Foi escolhido o fluxo de autenticação + proteção de rotas + logout porque é crítico para a segurança e a experiência do usuário: ninguém deve ver áreas protegidas sem sessão, e ao sair a navegação precisa voltar para o estado correto. Esse risco cobre login, sessão persistente, redirecionamento e estado de autenticação em rota protegida, que são pontos muito sensíveis em qualquer app.>
