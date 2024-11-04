import { BaseRequests } from '../../util/requests';

export class UsersRequests extends BaseRequests {
  signUp(email: string, name: string, masterPassword: string) {
    return this.app
      .post('/users')
      .send({ email, name, masterPassword });
  }
}