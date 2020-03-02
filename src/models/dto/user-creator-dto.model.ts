import { Role } from '../role.model';

export class RoleCreatorDto {
  username: string;
  uid: number;
  gid: number;
  email: string;
  homePath: string;
  active: boolean;
  role: Role;

  constructor(data?: Partial<RoleCreatorDto>) {
    Object.assign(this, data);
  }
}
