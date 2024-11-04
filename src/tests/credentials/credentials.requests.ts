import { BaseRequests } from '../../util/requests';
import { CreateCredentialDto, UpdateCredentialDto } from './credentials.dto';

export class CredentialsRequests extends BaseRequests {
  createCredential(userId: string, credential: CreateCredentialDto) {
    return this.app
      .post(`/users/${userId}/credentials`)
      .send(credential);
  }

  getCredentialsByUserId(userId: string) {
    return this.app
      .get(`/users/${userId}/credentials`)
  }

  getCredentialById(userId: string, credentialId: string) {
    return this.app
      .get(`/users/${userId}/credentials/${credentialId}`)
  }

  patchCredentialById(userId: string, credentialId: string, credential: UpdateCredentialDto) {
    return this.app
      .patch(`/users/${userId}/credentials/${credentialId}`)
      .send(credential);
  }
}