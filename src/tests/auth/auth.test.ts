import { INestApplication } from '@nestjs/common';
import { AuthRequests } from "./auth.requests"
import { getApp } from '../../util/nestjs.util';
import { NestApplication } from '@nestjs/core';

let authRequests: AuthRequests;
let app: string | INestApplication<any>

beforeAll(async () => {
  app = await getApp();
  authRequests = new AuthRequests(app, process.env.APIKEY)
}, 15000)

describe('auth test suite', () => {
  test('login failed', async () => {
    const response = await authRequests.login("foo@bar.baz", "foo")
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('email/password incorrect')
  });

  test('login succedeed', async () => {
    const response = await authRequests.login("test@test.org", process.env.TEST_AUTH_PASSWORD)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('access_token')
    expect(response.body).toHaveProperty('refresh_token')
  });
});

afterAll(async () => {
  if (app instanceof NestApplication) {
    app.close();
  }
})