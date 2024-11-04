export class CreateCredentialDto {
  url: string;
  title: string;
  username1: string;
  username2?: string;
  password: string;
  note?: string;
}

export class UpdateCredentialDto {
  url?: string;
  title?: string;
  username1?: string;
  username2?: string;
  password?: string;
  note?: string;
}