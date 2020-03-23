import { mapAccount } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import { Account, AccountCreatorDto, Role } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand, validNumber } from '../../utils';

export default class AccountAddRoleCommand extends BaseCommand {
  static description = 'Adds a role to an account';

  static examples = [`$ account-service account:add-role`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountAddRoleCommand);

    this.accountServiceUrl = flags.url;

    const accounts: Account[] = await this.getAccounts();
    if (accounts.length === 0) {
      console.log('No account found in accounts database.');
      return;
    }

    const roles: Role[] = await this.getRoles();
    if (roles.length === 0) {
      console.log('No role found in roles database.');
      return;
    }

    const questions = [
      {
        type: 'list',
        name: 'accountId',
        message: 'Choose an account',
        filter: Number,
        choices: accounts.map(account => {
          return {
            name: `${account.username} (id=${account.id})`,
            value: account.id
          };
        })
      },
      {
        type: 'list',
        name: 'roleId',
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
        accountId: number;
        roleId: number;
      }>(questions);

      console.log('Add role to account...');
      const account = await this.addAccountRole(
        answers.accountId,
        answers.roleId
      );
      console.log('... done');
      printTable([mapAccount(account)]);
    } catch (error) {
      console.error(error.message);
    }
  }
}
