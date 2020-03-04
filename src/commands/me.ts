import { mapRole } from '../views/model.view';
import { printTable } from 'console-table-printer';
import { BaseCommand } from '../utils';

export default class MeCommand extends BaseCommand {
  static description = 'Get info about me';

  static examples = [`$ account-service me`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(MeCommand);

    this.accountServiceUrl = flags.url;

    const me = await this.me(flags.token);

    console.log(me);
  }
}
