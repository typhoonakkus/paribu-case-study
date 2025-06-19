import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  token?: string;
  response?: Response;
  responseBody?: any;
  productId?: number;
  username?: string;
  password?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
