import { User } from "../../models";
import * as inquirer from "inquirer";
import { BaseCommand } from "../../utils";

export default class UserDeleteCommand extends BaseCommand {
  static description = "Deletes a user";

  static examples = [`$ account-service user:delete`];

  static flags = Object.assign({}, BaseCommand.baseFlags);

  async run() {
    const { args, flags } = this.parse(UserDeleteCommand);

    this.accountServiceUrl = flags.url;

    const users: User[] = await this.getUsers();

    if (users.length === 0) {
      console.log("No user found in users database.");
      return;
    }

    const questions = [
      {
        type: "list",
        name: "userId",
        message: "Choose a user to delete",
        filter: Number,
        choices: users.map(user => {
          return {
            name: `${user.username} (id=${user.id})`,
            value: user.id
          };
        })
      }
    ];

    try {
      const answers = await inquirer.prompt<{ userId: number }>(questions);

      console.log(`Deleting user ${answers.userId}...`);
      const done: boolean = await this.deleteUser(answers.userId);
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
