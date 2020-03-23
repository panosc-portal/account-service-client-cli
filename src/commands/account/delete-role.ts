import { Account, Role } from '../../models';
import { BaseCommand, validNumber } from '../../utils';
import { mapAccount } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import * as inquirer from 'inquirer';

export default class AccountDeleteRoleCommand extends BaseCommand {
  static description = 'Deletes a role from an account';

  static examples = [`$ account-service account:delete-role`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountDeleteRoleCommand);

    this.accountServiceUrl = flags.url;

    // Checks that the accounts database has at least one entry
    const accounts: Account[] = await this.getAccounts();
    if (accounts.length === 0) {
      console.log('No account found in accounts database.');
      return;
    }

    // Checks that the roles database has at least one entry
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

      console.log('Delete role from account...');
      const account = await this.deleteAccountRole(
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
