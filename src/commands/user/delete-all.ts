import { User } from "../../models";
import * as inquirer from "inquirer";
import { BaseCommand } from "../../utils";

export default class UserDeleteAllCommand extends BaseCommand {
  static description = "Deletes all users";

  static examples = [`$ account-service user:delete-all`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(UserDeleteAllCommand);

    this.accountServiceUrl = flags.url;

    const users: User[] = await this.getUsers();

    if (users.length === 0) {
      console.log("No entry found in user database.");
      return;
    }

    try {
      console.log(`Deleting all users...`);
      const done: boolean = await this.deleteAllUsers();
      if (done) {
        console.log("... done");
      } else {
        console.error("... failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
