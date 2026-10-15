// tests/support/catalog-page.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — D2 · PAGE OBJECT do catálogo (/qa)
//
// Complete os métodos marcados com ✍️. O  goto()  já está pronto (modelo).
// Regra: nenhum método daqui pode usar id fixo de filme — receba o TÍTULO.
// ─────────────────────────────────────────────────────────────────────────────

import { expect, type Locator, type Page } from '@playwright/test';
export class CatalogPage {
  constructor(private readonly page: Page) {}

  //Abre o catálogo e espera a grade aparecer.
  async goto() {
    await this.page.goto('/qa');
    await expect(this.page.getByTestId('movielist-grid')).toBeVisible();
  }

  //Devolve o card (role "article") cujo texto contém o título.
  card(title: string): Locator {
    return this.page.getByRole('article').filter({ hasText: title });
  }

  //Clica no botão "Favoritar …" DENTRO do card do título.
  async favorite(title: string) {
    return this.favorito(title);
  }

  async favorito(title: string) {
    const card = this.card(title);
    await card.getByRole('button', { name: /Favoritar/i }).click();
  }

  //Clica em "Favoritos" e espera a tela favorites-screen.
  async abrirFavoritos() {
    await this.page.getByTestId('movielist-favorites-button').click();
    await expect(this.page.getByTestId('favorites-screen')).toBeVisible();
  }

  //Locator do contador da tela de favoritos.
  get favoritesCount(): Locator {
    return this.page.getByTestId('favorites-count');
  }
}
