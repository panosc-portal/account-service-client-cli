import { Account, Role } from '../models';

export function mapRole(role: Role): any {
  return {
    Id: role.id,
    Name: role.name,
    Description: role.description
  };
}

export function mapAccount(account: Account): any {
  const roleNames = account.roles.map(({ name }) => name);

  return {
    Id: account.id,
    UserId: account.userId,
    Usernames: account.username,
    Uid: account.uid,
    Gid: account.gid,
    Email: account.email,
    HomePath: account.homePath,
    Active: account.active,
    Roles: roleNames
  };
}
