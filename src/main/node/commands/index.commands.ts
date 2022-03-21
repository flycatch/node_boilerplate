import { HelpCommand } from "./v1/help.command";
import { InitCommand } from "./v1/init.command";

const init: InitCommand = new InitCommand();
const help: HelpCommand = new HelpCommand();

export {
    init,
    help
};

