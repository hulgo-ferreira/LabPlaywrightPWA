// tests/livre/missao-livre.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO (correção MANUAL) — MISSÃO LIVRE (≈ 20 min)
//
// 🎯 Aqui NÃO tem roteiro. Você é o(a) QA: escolhe o fluxo, decide o que testar e
//    justifica. É a parte que mais mostra como você pensa.
//
// 🧩 O que fazer
//   1. ESCOLHA UM fluxo do CineFav que os blocos A–F não testaram. Sugestões:
//        • remover um favorito pela tela /favorites
//        • a tela /pwa (painel "Raio-X da PWA") e seus botões
//        • logout protege as rotas (deslogado, abrir /favorites manda pro /login)
//        • comentário: vazio, muito longo (limite 280), vários comentários
//        • busca com espaços/maiúsculas ("  MATRIX ")
//        • botão Voltar do detalhe (histórico do navegador)
//      …ou um fluxo que VOCÊ achar importante. Dica: use o app de verdade 3 minutos antes!
//   2. ESCREVA 3 testes do MESMO fluxo, com nome começando por:
//        "feliz:"     o caminho normal funciona
//        "negativo:"  algo dá errado e o app reage direito
//        "borda:"     o caso limite (vazio, repetido, máximo, recarregar…)
//   3. Em pelo menos UM deles use algo que você NÃO usou nos blocos A–F — por exemplo
//      test.step · page.goBack() · .not (ex.: not.toBeVisible) · test.fail() · toHaveScreenshot.
//   4. Cada teste precisa de expect de verdade (asserção que falharia se o app quebrasse).
//   5. Responda a pergunta 6 do  RESPOSTAS.md  (por que ESSE fluxo, que risco ele cobre).
//
// 🔎 BÔNUS exploratório (vale reconhecimento): achou algo ESTRANHO no app? Escreva um
//    teste que documenta o comportamento e marque com  test.fixme()  ou  test.fail()
//    + um comentário explicando por que é suspeito. Isso é bug report em forma de código.
//
// ✅ Validar:  npx playwright test livre   → verde nos 3 testes
//
// APAGUE o teste de exemplo abaixo e escreva os seus.
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from '@playwright/test';

test.describe('Missão livre — proteção de rotas e logout', () => {
  test('feliz: logout leva de volta para o login com passo a passo claro', async ({ page }) => {
    await page.goto('/qa');

    await test.step('abre catálogo autenticado', async () => {
      await expect(page.getByTestId('movielist-grid')).toBeVisible();
    });

    await test.step('faz logout', async () => {
      await page.getByTestId('logout-button').click();
    });

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test.describe('sem sessão', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('negativo: /favorites e /qa redirecionam para /login', async ({ page }) => {
      await page.goto('/favorites');
      await expect(page).toHaveURL(/\/login$/);

      await page.goto('/qa');
      await expect(page).toHaveURL(/\/login$/);
    });
  });

  test('borda: após logout, o botão de sair some e o formulário de login aparece', async ({ page }) => {
    await page.goto('/qa');
    await page.getByTestId('logout-button').click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId('logout-button')).not.toBeVisible();
    await expect(page.getByTestId('login-submit-button')).toBeVisible();
  });
});
