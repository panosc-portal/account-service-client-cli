export class AccountCreatorDto {
  username: string;
  userId: number;
  uid: number;
  gid: number;
  email: string;
  active: boolean;
  homePath: string;
  roles: number[];

  constructor(data?: Partial<AccountCreatorDto>) {
    Object.assign(this, data);
  }
}
