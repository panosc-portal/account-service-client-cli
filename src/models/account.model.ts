import { Role } from './role.model';

export class Account {
  id: number;
  userId: number;
  username: string;
  uid: number;
  gid: number;
  email: string;
  homePath: string;
  active: boolean;
  createdAt: Date;
  roles: Role[];

  constructor(data?: Partial<Account>) {
    Object.assign(this, data);
  }
}
