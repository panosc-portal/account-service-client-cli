import { Role, User } from '../models';

export function mapRole(role: Role): any {
  return {
    Id: role.id,
    Name: role.name,
    Description: role.description
  };
}

export function mapUser(user: User): any {
  return {
    Id: user.id,
    Usernames: user.username,
    Uid: user.uid,
    Gid: user.gid,
    Email: user.email,
    Homedir: user.homedir,
    Active: user.active,
    Role: user.role.id
  };
}
