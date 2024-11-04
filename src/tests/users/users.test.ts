import { INestApplication } from '@nestjs/common';
import { UsersRequests } from "./users.requests"
import { getApp } from '../../util/nestjs.util';
import { NestApplication } from '@nestjs/core';
import { AuthRequests } from '../auth/auth.requests';
import { randomText } from '../../util/data.util';

let usersRequests: UsersRequests;
let authRequests: AuthRequests;
let app: string | INestApplication<any>

beforeAll(async () => {
  app = await getApp();
  usersRequests = new UsersRequests(app, process.env.APIKEY)
  authRequests = new AuthRequests(app, process.env.APIKEY)
}, 15000)

describe('users test suite', () => {
  test('signup failed - invalid email', async () => {
    const response = await usersRequests.signUp("invalid_email@", "TEST", randomText())
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('email must be an email')
  });

  test('signup failed - empty password', async () => {
    const randomEmail = randomText() + "@test.org"
    const response = await usersRequests.signUp(randomEmail, "TEST", "")
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('masterPassword should not be empty')
  });

  test('signup failed - duplicate email', async () => {
    const response = await usersRequests.signUp("test@test.org", "TEST", randomText())
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('invalid email')
    expect(response.body.error).toBe('An account with this email already exists')
  });

  test('signup succedeed', async () => {
    const randomEmail = randomText() + "@test.org"
    const response = await usersRequests.signUp(randomEmail, "TEST", randomText())
    expect(response.statusCode).toBe(201)
    expect(Object.keys(response.body).sort()).toEqual(['email', 'id', 'name'].sort())
  });

  test('signup succedeed - first login', async () => {
    const randomEmail = randomText() + "@test.org"
    const randomPassword = randomText()
    const response = await usersRequests.signUp(randomEmail, "TEST", randomPassword)
    expect(response.statusCode).toBe(201)

    const authResponse = await authRequests.login(randomEmail, randomPassword)
    expect(authResponse.statusCode).toBe(200)
  })
});

afterAll(async () => {
  if (app instanceof NestApplication) {
    app.close();
  }
})
