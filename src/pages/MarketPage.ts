import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MarketPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async filterByFan() {
    await this.safeClick('text=FAN');   
  }

  async select12HourChange() {
    await this.safeClick('div.p-filter-chip:has-text("Fiyat değişimi zaman aralığı")');
    await this.safeClick('h3.p-list__title:has-text("12 saat")');
  }

  async clickThirdCrypto() {
    await this.safeClick('section.market-list__item >> nth=2');    
  }

  async expectCryptoDetailPageLoaded() {
    // Coin detay sayfasının geldiğinin kontrolü  
    await this.page.waitForLoadState('networkidle');  
    await this.expectToBeVisible('div.p-tab__panel.mx-n3.overflow-hidden');
  }
}
