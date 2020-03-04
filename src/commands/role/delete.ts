import { Role } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class RoleDeleteCommand extends BaseCommand {
  static description = 'Deletes a role from the account service';

  static examples = [`$ account-service role:delete`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(RoleDeleteCommand);

    this.accountServiceUrl = flags.url;

    const roles: Role[] = await this.getRoles();

    if (roles.length === 0) {
      console.log('No entry found in role database.');
      return;
    }

    const questions = [
      {
        type: 'list',
        name: 'roleId',
        message: 'Choose a role to delete',
        filter: Number,
        choices: roles.map(role => {
          return {
            name: `${role.name} (id=${role.id})`,
            value: role.id
          };
        })
      }
    ];

    try {
      const answers = await inquirer.prompt<{ roleId: number }>(questions);

      console.log(`Deleting role ${answers.roleId}...`);
      const done: boolean = await this.deleteRole(answers.roleId);
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
