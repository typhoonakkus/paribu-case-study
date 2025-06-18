import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CoinDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getCurrentPrice() {
    const price = await this.getText('#markets-detail-value span');   
    return price;
  }

  async enterUnitPrice(price: string) {
    await this.safeFill('#price',price);
  }

  async enterQuantity(dataKey: string) {
    await this.safeFill('#amount', dataKey, true);  
  }

  async getTotalPrice(): Promise<string> {
    const totalAmount = await this.page.locator('#total').getAttribute('value');
    if (!totalAmount) throw new Error('Total Price input value not found');
    return totalAmount;
  }
  
}
