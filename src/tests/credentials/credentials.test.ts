import { INestApplication } from "@nestjs/common";
import { CredentialsRequests } from "./credentials.requests"
import { getApp } from '../../util/nestjs.util';
import { NestApplication } from '@nestjs/core';
import { AuthRequests } from '../auth/auth.requests';
import { CreateCredentialDto } from './credentials.dto';

let credentialsRequests: CredentialsRequests;
let authRequests: AuthRequests;
let app: INestApplication<any> | string
let loginResponseBody: any
let newCredential: CreateCredentialDto

beforeAll(async () => {
  app = await getApp();

  // Init auth requests
  authRequests = new AuthRequests(app, process.env.APIKEY)

  // Authentication
  const loginResponse = await authRequests.login("test@test.org", process.env.TEST_AUTH_PASSWORD)
  expect(loginResponse.statusCode).toBe(200)
  loginResponseBody = loginResponse.body

  // Init credential requests
  credentialsRequests = new CredentialsRequests(app, process.env.APIKEY, loginResponseBody.access_token)

  // Credential example
  newCredential = {
    url: "https://example.com",
    title: "Example",
    username1: "test",
    username2: "test",
    password: "test",
    note: "test"
  }
}, 15000)

describe('credential test suite', () => {
  test('create credential', async () => {

    const response = await credentialsRequests.createCredential(loginResponseBody.id, newCredential)
    expect(response.statusCode).toBe(201)

    // validate response body
    const keys = Object.keys(newCredential)
    keys.push("id", "userId")
    expect(Object.keys(response.body).sort()).toEqual(keys.sort())
  });
});

afterAll(async () => {
  if (app instanceof NestApplication) {
    app.close();
  }
})