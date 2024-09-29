import request, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { App } from 'supertest/types';

export class AuthRequests {
  private app: TestAgent<Test>;
  private apiKey: string;

  constructor(app: App, apiKey: string) {
    this.apiKey = apiKey;
    this.app = request.agent(app).set('x-api-key', this.apiKey);
  }

  login(user: string, password: string) {
    return this.app
      .post('/auth/login')
      .set('x-api-key', this.apiKey)
      .send({ email: user, password });
  }
}