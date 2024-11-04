import { INestApplication } from "@nestjs/common";
import request, { Test } from 'supertest';
import TestAgent from "supertest/lib/agent";

export abstract class BaseRequests {
  protected app: TestAgent<Test>;

  constructor(app: string | INestApplication<any>, apiKey: string, token?: string) {
    const superTestApp = typeof (app) === "string" ? app : app.getHttpServer();
    const agent = request.agent(superTestApp).set('x-api-key', apiKey);

    if (token) {
      agent.set('Authorization', `Bearer ${token}`);
    }

    this.app = agent;
  }
}