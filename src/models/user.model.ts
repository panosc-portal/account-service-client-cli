import { Role } from "./role.model";

export class User {
  id: number;
  username: string;
  uid: number;
  gid: number;
  email: string;
  homedir: string;
  active: boolean;
  createdAt: Date;
  roles: Role[];

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
