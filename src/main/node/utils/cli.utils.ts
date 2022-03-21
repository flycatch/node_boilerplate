import meow from "meow";
import { Command } from "../commands/Command";
import { help } from "../commands/index.commands";

export type Flag = meow.AnyFlag & { desc: string };
export type Cli = meow.Result<Record<string, Flag>>;

export const getCli = (command: Command): Cli => {
    return meow(help.generateHelp(), {
        inferType: true,
        description: false,
        argv: process.argv.slice(3),
        flags: command.flags
    });
};