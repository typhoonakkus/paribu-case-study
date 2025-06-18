import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../utils/logger';
import testData from '../test-data/data.json';


export class BasePage {

  private logger: Logger;
  constructor(protected page: Page) {
    this.logger = new Logger();
  }

  log(message: string) {
    this.logger.log(`[BasePage] ${message}`);
  }
  
  // ✅ Çerez banner’ını kapat
  async closeCookies() {
    const cookieBtn = this.page.getByRole('button', { name: 'Tüm çerezleri kabul et' }); // metin değişebilir
    if (await cookieBtn.isVisible()) {
      await cookieBtn.click();
    }
  }

  // ✅ Ortak tıklama metodu (explicit wait ile)
  async safeClick(selector: Locator | string, timeout = 5000) {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();    
  }

  // Test datasından key ile değeri getirir
  getTestDataValue(key: string): string {
  const value = (testData as any)[key];
    if (value === undefined) {
      throw new Error(`Test data for key "${key}" not found`);
    }
    return value.toString();
  }

  // ✅ Ortak fill metodu
  async safeFill(selector: Locator | string, valueOrKey: string, isDataKey = false, timeout = 5000) {
    const value = isDataKey ? this.getTestDataValue(valueOrKey) : valueOrKey;
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  // ✅ Locator’ın görünürlüğünü assert et
  async expectToBeVisible(selector: Locator | string, timeout = 5000) {
     const locator = this.resolveLocator(selector);
    try {
      await expect(locator).toBeVisible({ timeout });
      await this.takeScreenshot('assert-visible-success');
      this.logger.info(`Assertion passed: Element is visible`);
    } catch (error) {
      await this.takeScreenshot('assert-visible-fail');
      this.logger.error(`Assertion failed: Element is not visible`);
      throw error;
    }
  }

  // ✅ Selector görünene kadar bekle
  async waitForSelector(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }
  // ✅ Assertionlar
  async assertEquals(actual: any, expected: any, message?: string) {
    try {
      expect(actual).toEqual(expected);
      await this.takeScreenshot('assertEquals-success');
      this.logger.info(message ?? `Assertion passed: ${actual} === ${expected}`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed: ${actual} !== ${expected}`);
      throw error;
    }
  }

  async assertNotEquals(actual: any, expected: any, message?: string) {
    try {
      expect(actual).not.toEqual(expected);
      await this.takeScreenshot('assertNotEquals-success');
      this.logger.info(message ?? `Assertion passed: ${actual} !== ${expected}`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed: ${actual} === ${expected}`);
      throw error;
    }
  }

  async assertCloseTo(actual: number, expected: number, precision = 2, message?: string) {
    try {
      expect(actual).toBeCloseTo(expected, precision);
      await this.takeScreenshot('assertCloseTo-success');
      this.logger.info(message ?? `Assertion passed (close to): ${actual} ≈ ${expected}`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed (close to): ${actual} !≈ ${expected}`);
      throw error;
    }
  }


  async assertTrue(condition: boolean, message?: string) {
    try {
      expect(condition).toBeTruthy();
      await this.takeScreenshot('assertTrue-success');
      this.logger.info(message ?? `Assertion passed: condition is true`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed: condition is false`);
      throw error;
    }
  }

  async assertFalse(condition: boolean, message?: string) {
    try {
      expect(condition).toBeFalsy();
      await this.takeScreenshot('assertFalse-success');
      this.logger.info(message ?? `Assertion passed: condition is false`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed: condition is true`);
      throw error;
    }
  }

  async assertContains(haystack: string, needle: string, message?: string) {
    try {
      expect(haystack).toContain(needle);
      await this.takeScreenshot('assertContains-success');
      this.logger.info(message ?? `Assertion passed: "${haystack}" contains "${needle}"`);
    } catch (error) {
      this.logger.error(message ?? `Assertion failed: "${haystack}" does not contain "${needle}"`);
      throw error;
    }
  }


  // ✅ Selector textini al
  async getText(selector: string | Locator, timeout = 5000): Promise<string> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.waitFor({ state: 'visible', timeout });

    const text = await locator.textContent();
    if (!text) throw new Error(`Element found but no text content: ${selector}`);

    return text.trim();
  }  

  // ✅ Screenshot alır
  async takeScreenshot(fileName: string) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-'); // ISO string’den : ve . işaretlerini - ile değiştiriyoruz
    const fileNameWithTimestamp = `${fileName}-${timestamp}.png`;

    await this.page.screenshot({
      path: `screenshots/${fileNameWithTimestamp}`,
      fullPage: true,
    });

    this.logger.info(`Screenshot taken: ${fileNameWithTimestamp}`);
  }

  // ✅ URL’nin belirli bir parçaya ulaşmasını bekler
  async waitForURL(urlPart: string, timeout = 5000) {
    await this.page.waitForURL(new RegExp(urlPart), { timeout });
  }

  // ✅ Klavye tuşu gönderimi (örn. Enter, Tab)
  async pressKey(selector: Locator | string, key: string, timeout = 5000) {
    const locator = this.resolveLocator(selector);
    await locator.waitFor({ state: 'visible', timeout });
    await locator.press(key);
  }

  // ✅ Locator string ya da Locator tipini normalize eder
  protected resolveLocator(selector: Locator | string): Locator {
    return typeof selector === 'string' ? this.page.locator(selector) : selector;
  }
}
