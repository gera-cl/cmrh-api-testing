import { BaseRequests } from '../../util/requests';

export class AuthRequests extends BaseRequests {
  login(user: string, password: string) {
    return this.app
      .post('/auth/login')
      .send({ email: user, password });
  }
}