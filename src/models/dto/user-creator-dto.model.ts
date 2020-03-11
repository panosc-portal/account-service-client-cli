export class UserCreatorDto {
  username: string;
  uid: number;
  gid: number;
  email: string;
  active: boolean;
  homedir: string;
  roles: number[];

  constructor(data?: Partial<UserCreatorDto>) {
    Object.assign(this, data);
  }
}
