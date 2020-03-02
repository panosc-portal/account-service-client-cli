import { Role } from '../models';

export function mapRole(role: Role): any {
  return {
    Id: role.id,
    Name: role.name,
    Description: role.description
  };
}
