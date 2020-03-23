import { Account } from '../../models';
import * as inquirer from 'inquirer';
import { BaseCommand } from '../../utils';

export default class AccountDeleteAllCommand extends BaseCommand {
  static description = 'Deletes all accounts';

  static examples = [`$ account-service account:delete-all`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountDeleteAllCommand);

    this.accountServiceUrl = flags.url;

    const accounts: Account[] = await this.getAccounts();

    if (accounts.length === 0) {
      console.log('No entry found in accounts database.');
      return;
    }

    try {
      console.log(`Deleting all accounts...`);
      const done: boolean = await this.deleteAllAccounts();
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
