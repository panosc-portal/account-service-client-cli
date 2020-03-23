import { mapAccount } from '../../views/model.view';
import { printTable } from 'console-table-printer';
import { BaseCommand } from '../../utils';

export default class AccountListCommand extends BaseCommand {
  static description = 'List accounts of the account service';

  static examples = [`$ account-service account:list`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(AccountListCommand);

    this.accountServiceUrl = flags.url;

    const accounts = await this.getAccounts();

    if (accounts.length > 0) {
      const accountTableData = accounts.map(account => mapAccount(account));

      printTable(accountTableData);
    } else {
      console.log('The account database is empty.');
    }
  }
}
