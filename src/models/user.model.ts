import { Role } from './role.model';

export class User {
  id: number;
  username: string;
  uid: number;
  gid: number;
  email: string;
  homePath: string;
  active: boolean;
  createdAt: Date;
  role: Role;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
