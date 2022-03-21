import { HelpCommand } from '@commands/v1/help.command';
import { InitCommand } from '@commands/v1/init.command';

export const commands = {
    init: new InitCommand(),
    help: new HelpCommand(),
} as const;
