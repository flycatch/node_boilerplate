import chalk from 'chalk';
import { commands } from '@commands';
import { Command } from '@commands/Command';
import { config } from '@config/app.config';
import { AppUtils } from '@utils/app.utils';
import { Cli, Flag } from '@utils/cli.utils';

export class HelpCommand implements Command {
    private static readonly spacer: string = '\n\n';

    private static readonly dim = chalk.dim;

    private static readonly greenInverse = chalk.bold.inverse.green;

    private static readonly cyanInverse = chalk.bold.inverse.cyan;

    private static readonly yellowInverse = chalk.bold.inverse.yellow;

    private cliName: string = config.app.name;

    private cliDesc: string = config.app.desc;

    constructor(
        readonly desc: string = 'Get help for the cli and commands',
        readonly usage: string = `${chalk.cyan('help')} ${chalk.cyan('[commands]')}`,
        readonly flags: Record<string, Flag> = {},
    ) { }

    async run(cli: Cli) {
        if (cli.input[0]) {
            const command = AppUtils.getCommand(cli.input[0]);
            if (command) {
                console.log(this.generateCommandHelp(cli.input[0], command));
                return;
            }
        }
        cli.showHelp();
    }

    public generateCommandHelp(commandName: string, command: Command): string {
        let name = commandName;
        let help = '\n  ';
        help += (command.desc || '') + HelpCommand.spacer;
        help += `  ${HelpCommand.greenInverse(' USAGE ')} ${HelpCommand.spacer}`;
        help += `   ${chalk.gray('$')} ${chalk.green(this.cliName)} `;
        name = chalk.cyan(name);
        help += command.usage || (command.flags ? `${name} ${chalk.yellow('[options]')}` : `${name}`);
        help += HelpCommand.spacer;
        if (command.flags && Object.keys(command.flags).length !== 0) {
            help += `  ${HelpCommand.yellowInverse(' OPTIONS ')}${HelpCommand.spacer}`;
            const table = AppUtils.createTable();

            Object.keys(command.flags).forEach((flagName) => {
                const flag = command.flags[flagName];
                const alias = flag.alias ? `-${flag.alias},` : '';
                const defaultValue = flag.default !== undefined ? `Default: ${chalk.yellow(flag.default)}` : '';
                table.push(
                    [chalk.yellow(`  ${alias}--${flagName}`), `${flag.desc} ${HelpCommand.dim(defaultValue)}`],
                );
            });
            help += table.toString() + HelpCommand.spacer;
        }
        return help;
    }

    public generateHelp(): string {
        let help = (this.cliDesc || '') + HelpCommand.spacer;
        help += HelpCommand.greenInverse(' USAGE ') + HelpCommand.spacer;
        help += ` ${chalk.gray('$')} ${chalk.green(this.cliName)} ${chalk.cyan('<commands>')} ${chalk.yellow('[options]')}${HelpCommand.spacer}`;
        help += HelpCommand.cyanInverse(' COMMANDS ') + HelpCommand.spacer;
        const table = AppUtils.createTable();
        Object.keys(commands).forEach((key) => {
            const command = commands[key as keyof typeof commands] as Command;
            const alias = command.alias ? `, ${command.alias}` : '';
            table.push(
                [chalk.cyan(`${key}${alias}`), command.desc],
            );
        });
        help += table.toString() + HelpCommand.spacer;
        help += chalk.dim('For more info on a command type:\n');
        help += chalk.gray('  $ ') + chalk.green(this.cliName) + chalk.cyan(' help ') + chalk.cyan('<command>');
        return help;
    }
}
