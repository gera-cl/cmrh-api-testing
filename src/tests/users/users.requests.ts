import request, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { App } from 'supertest/types';

export class UsersRequests {
  private app: TestAgent<Test>;
  private apiKey: string;

  constructor(app: App, apiKey: string) {
    this.apiKey = apiKey;
    this.app = request.agent(app).set('x-api-key', this.apiKey);
  }

  signUp(email: string, name: string, masterPassword: string) {
    return this.app
      .post('/users')
      .set('x-api-key', this.apiKey)
      .send({ email, name, masterPassword });
  }
}