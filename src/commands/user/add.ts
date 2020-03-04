import { mapUser } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import { Role, UserCreatorDto } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class UserAddCommand extends BaseCommand {
  static description = 'Adds a user to the account service';

  static examples = [`$ account-service user:add`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const validNumber = function(value: string) {
      const valid = !isNaN(Number(value));
      return valid || 'Please enter a number';
    };

    const { args, flags } = this.parse(UserAddCommand);

    this.accountServiceUrl = flags.url;

    const roles: Role[] = await this.getRoles();

    const questions = [
      {
        type: 'input',
        name: 'username',
        message: 'Enter a username',
        validate: function(value: string) {
          return value != null || 'The name must be a non-null string';
        }
      },
      {
        type: 'input',
        name: 'uid',
        filter: Number,
        message: "Enter user's uid",
        validate: validNumber
      },
      {
        type: 'input',
        name: 'gid',
        filter: Number,
        message: "Enter user's gid",
        validate: validNumber
      },
      {
        type: 'input',
        name: 'active',
        filter: Boolean,
        message: 'Activate user ?',
        validate: validNumber
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter user's email"
      },
      {
        type: 'input',
        name: 'homedir',
        message: "Enter user's home directory"
      },
      {
        type: 'list',
        name: 'role',
        message: 'Choose a role',
        validate: validNumber,
        filter: Number,
        choices: roles.map(role => {
          return {
            name: `${role.name} (${role.description})`,
            value: role.id
          };
        })
      }
    ];

    try {
      const answers = await inquirer.prompt<{
        name: string;
        description: string;
      }>(questions);

      const userCreator = new UserCreatorDto();
      userCreator.username = answers.username;
      userCreator.uid = answers.uid;
      userCreator.gid = answers.gid;
      userCreator.active = answers.active;
      userCreator.email = answers.email;
      userCreator.homedir = answers.homedir;
      userCreator.role = answers.role;

      console.log(JSON.stringify(userCreator));

      console.log('Creating user...');
      const user = await this.createUser(userCreator);
      console.log('... done');
      printTable([mapUser(user)]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
