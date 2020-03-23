import { mapAccount } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import { AccountCreatorDto, Role, RoleCreatorDto } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand, validNumber } from '../../utils';

export default class AccountAddCommand extends BaseCommand {
  static description = 'Adds an account';

  static examples = [`$ account-service account:add`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountAddCommand);

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
        name: 'userId',
        filter: Number,
        message: 'Enter user id',
        validate: validNumber
      },
      {
        type: 'input',
        name: 'uid',
        filter: Number,
        message: "Enter account's uid",
        validate: validNumber
      },
      {
        type: 'input',
        name: 'gid',
        filter: Number,
        message: "Enter account's gid",
        validate: validNumber
      },
      {
        type: 'input',
        name: 'active',
        filter: Boolean,
        message: 'Activate account ?',
        validate: validNumber
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter account's email"
      },
      {
        type: 'input',
        name: 'homePath',
        message: "Enter account's home directory"
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
        username: string;
        userId: number;
        uid: number;
        gid: number;
        active: boolean;
        email: string;
        homePath: string;
        role: number;
      }>(questions);

      const accountCreator = new AccountCreatorDto();
      accountCreator.username = answers.username;
      accountCreator.userId = answers.userId;
      accountCreator.uid = answers.uid;
      accountCreator.gid = answers.gid;
      accountCreator.active = answers.active;
      accountCreator.email = answers.email;
      accountCreator.homePath = answers.homePath;
      accountCreator.roles = [answers.role];

      console.log(JSON.stringify(accountCreator));

      console.log('Creating account...');
      const account = await this.createAccount(accountCreator);
      console.log('... done');
      printTable([mapAccount(account)]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
