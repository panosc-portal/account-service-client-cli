export class RoleCreatorDto {
  name: string;
  description?: string;

  constructor(data?: Partial<RoleCreatorDto>) {
    Object.assign(this, data);
  }
}
