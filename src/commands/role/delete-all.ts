import { Role } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class RoleDeleteAllCommand extends BaseCommand {
  static description = 'Deletes all roles from the account service';

  static examples = [`$ account-service role:delete-all`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(RoleDeleteAllCommand);

    this.accountServiceUrl = flags.url;

    const roles: Role[] = await this.getRoles();

    if (roles.length === 0) {
      console.log('No entry found in role database.');
      return;
    }

    try {
      console.log(`Deleting all roles...`);
      const done: boolean = await this.deleteAllRoles();
      if (done) {
        console.log('... done');
      } else {
        console.error('... failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
