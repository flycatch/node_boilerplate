import meow from 'meow';
import { commands } from '@commands';
import { Command } from '@commands/Command';

export type Flag = meow.AnyFlag & { desc: string };
export type Cli = meow.Result<Record<string, Flag>>;

export const config = (command: Command<any>) => meow(commands.help.generateHelp(), {
    inferType: true,
    description: false,
    flags: command.flags,
    argv: process.argv.slice(3),
});
