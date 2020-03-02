import { mapRole } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import { RoleCreatorDto } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class RoleAddCommand extends BaseCommand {
  static description = 'Adds a role to the account service';

  static examples = [`$ account-service role:add`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(RoleAddCommand);

    this.accountServiceUrl = flags.url;

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the role',
        validate: function(value: string) {
          return value != null || 'The name must be a non-null string';
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the role'
      }
    ];

    try {
      const answers = await inquirer.prompt<{
        name: string;
        description: string;
      }>(questions);

      const roleCreator = new RoleCreatorDto();
      roleCreator.name = answers.name;
      roleCreator.description = answers.description;

      console.log(JSON.stringify(roleCreator));

      console.log('Creating flavour...');
      const role = await this.createRole(roleCreator);
      console.log('... done');
      printTable([mapRole(role)]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
