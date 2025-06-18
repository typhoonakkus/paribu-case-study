import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToMarkets() {
    await this.safeClick(this.page.getByRole('link', { name: 'Piyasalar' })); 
  }
  async expectMarketsPageLoaded() {
    // 'Piyasalar' sayfasının geldiğinin kontrolü    
    await this.page.waitForLoadState('networkidle');
    await this.expectToBeVisible('section.market-list__content-box');
  }
}
