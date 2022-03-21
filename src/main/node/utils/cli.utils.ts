import meow from 'meow';
import { Command } from '@commands/Command';
import { commands } from '@commands';

export type Flag = meow.AnyFlag & { desc: string };
export type Cli = meow.Result<Record<string, Flag>>;

export const getCli = (command: Command): Cli => meow(commands.help.generateHelp(), {
    inferType: true,
    description: false,
    argv: process.argv.slice(3),
    flags: command.flags,
});
