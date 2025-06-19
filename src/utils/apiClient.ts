import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  private requestContext!: APIRequestContext;

  // Async init metodu ile requestContext başlatılıyor
  async init() {
    this.requestContext = await request.newContext();
  }

  async post(url: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.requestContext.post(url, {
      data,
      headers,
    });
    return response;
  }

  async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.requestContext.get(url, { headers });
    return response;
  }

  async put(url: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.requestContext.put(url, {
      data,
      headers,
    });
    return response;
  }

  async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.requestContext.delete(url, { headers });
    return response;
  }
}
