import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ProductService } from '../../src/services/productService';
import { CustomWorld } from '../support/customWorld';
import { TokenStore } from '../../src/utils/tokenStore';
import { Logger } from '../../src/utils/logger';

let updatedProductId: number;

Given('the user has a valid token', async function (this: CustomWorld) {
  Logger.info('Checking for a valid token in CustomWorld...');
  this.token = TokenStore.getToken() ?? undefined;
  if (!this.token) {
    throw new Error('Token is not set! Please run login scenario first.');
  }
  Logger.info('Valid token found.');
});

When('the user requests {int} products from the product list', async function (this: CustomWorld, limit: number) {
  Logger.info(`Requesting ${limit} products with token: ${this.token?.substring(0, 10)}...`);
  const token = this.token ?? TokenStore.getToken();
  if (!token) throw new Error('Token is not set!');
  
  const response = await ProductService.getProducts(token, limit);
  Logger.info(`Received response with status: ${response.status}`);
  this.response = response;
});

Then('the product list should contain {int} items', async function (this: CustomWorld, expectedCount: number) {
  const body = await this.response!.json();
  Logger.info(`Checking product list length: expected=${expectedCount}, actual=${body.products.length}`);
  expect(body.products.length).toBe(expectedCount);
});

When('the user updates the name of the first product', async function (this: CustomWorld) {
  // Önce ürün listesini alalım, ilk ürünün id'sini alalım
  const response = await ProductService.getProducts(this.token!, 1);
  const body = await response.json();
  const firstProduct = body.products[0];
  updatedProductId = firstProduct.id;

  // Ürün adını güncelleyelim (örnek: sonuna "- Updated" ekliyoruz)
  const updatedName = firstProduct.name + ' - Updated';
  const updateResponse = await ProductService.updateProduct(this.token!, updatedProductId, { name: updatedName });

  this.response = updateResponse;
});

Then('the response status should be {int}', function (this: CustomWorld, expectedStatus: number) {
  expect(this.response?.status).toBe(expectedStatus);
});

When('the user deletes the updated product', async function (this: CustomWorld) {
  if (!updatedProductId) {
    throw new Error('No product updated previously to delete.');
  }
  const deleteResponse = await ProductService.deleteProduct(this.token!, updatedProductId);
  this.response = deleteResponse;
});

Then('the delete response should be {int}', function (this: CustomWorld, expectedStatus: number) {
  expect(this.response?.status).toBe(expectedStatus);
});
