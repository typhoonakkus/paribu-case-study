import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.ENV || 'testing'}` });

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://dummyjson.com',
  },
});
