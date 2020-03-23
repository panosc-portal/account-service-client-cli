import { Account } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class AccountDeleteCommand extends BaseCommand {
  static description = 'Deletes an account';

  static examples = [`$ account-service account:delete`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountDeleteCommand);

    this.accountServiceUrl = flags.url;

    const accounts: Account[] = await this.getAccounts();

    if (accounts.length === 0) {
      console.log('No account found in accounts database.');
      return;
    }

    const questions = [
      {
        type: 'list',
        name: 'accountId',
        message: 'Choose aa account to delete',
        filter: Number,
        choices: accounts.map(account => {
          return {
            name: `${account.username} (id=${account.id})`,
            value: account.id
          };
        })
      }
    ];

    try {
      const answers = await inquirer.prompt<{ accountId: number }>(questions);

      console.log(`Deleting account ${answers.accountId}...`);
      const done: boolean = await this.deleteAccount(answers.accountId);
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
