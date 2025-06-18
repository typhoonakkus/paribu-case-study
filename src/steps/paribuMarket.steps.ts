import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import testData from '../test-data/data.json';

setDefaultTimeout(60 * 1000); // 60 saniye timeout

let price: number;

Given('I open the Paribu homepage', async function () {
  console.log('Step definitions loaded*-*****************************');
  await this.page.goto(this.baseUrl);
  await this.page.waitForLoadState('networkidle');
});

When('I close the cookie notice', async function () {
  await this.homePage.closeCookies();
});

When('I navigate to the Markets page', async function () {
  await this.homePage.goToMarkets();
  await this.homePage.expectMarketsPageLoaded();
});

When('I filter by FAN', async function () {
  await this.marketPage.filterByFan();
});

When('I set the price change timeframe to 12 hours', async function () {
  await this.marketPage.select12HourChange();
});

When('I select the third listed cryptocurrency', async function () {
  await this.marketPage.clickThirdCrypto();
  await this.marketPage.expectCryptoDetailPageLoaded();
});

When('I enter the current price into the Unit Price field', async function () {
  const priceStr = await this.coinPage.getCurrentPrice();
  price = parseFloat(priceStr);
  await this.coinPage.enterUnitPrice(priceStr);
});

When('I enter {string} as the quantity', async function (dataKey: string) {
  await this.coinPage.enterQuantity(dataKey);
  this.quantity = parseFloat((testData as any)[dataKey]);  // sonra kullanılmak üzere sakla
});

Then('the Total Price should be correctly calculated', async function () {
  const totalPrice = await this.coinPage.getTotalPrice();

  console.log('*****', totalPrice, '******', price, '******', this.quantity);
  await this.coinPage.assertCloseTo(
    parseFloat(totalPrice),
    price * this.quantity,
    2,  // precision: ondalık hassasiyet
    "Total Price alanı doğru hesaplanmalı"
  );
});
