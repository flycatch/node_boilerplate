import chalk from 'chalk';
import { commands } from '@commands';
import { Command } from '@commands/Command';
import {
    log,
    MeowConfig,
} from '@config';
import { constants } from '@constants';
import { BaseFlag } from '@flags/base.flag';
import { properties } from '@properties';
import { AppUtils } from '@utils';

export class HelpCommand implements Command<BaseFlag> {
    private static readonly spacer: string = '\n\n';

    private static readonly dim = chalk.dim;

    private static readonly greenInverse = chalk.bold.inverse.green;

    private static readonly cyanInverse = chalk.bold.inverse.cyan;

    private static readonly yellowInverse = chalk.bold.inverse.yellow;

    constructor(
        readonly desc: string = constants.HELP_COMMAND_DESC,
        readonly usage: string = `${chalk.cyan('help')} ${chalk.cyan('[commands]')}`,
        readonly flags = {},
    ) { }

    async run(cli: MeowConfig.Cli) {
        if (cli.input[0]) {
            const command = AppUtils.getCommand(cli.input[0]);
            if (command) {
                log.print(this.generateCommandHelp(cli.input[0], command));
                return;
            }
        }
        cli.showHelp();
    }

    public generateCommandHelp(commandName: string, command: Command<any>): string {
        let name = commandName;
        let help = '\n  ';
        help += (command.desc || '') + HelpCommand.spacer;
        help += `  ${HelpCommand.greenInverse(' USAGE ')} ${HelpCommand.spacer}`;
        help += `   ${chalk.gray('$')} ${chalk.green(properties.app.name)} `;
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
        let help = (properties.app.desc || '') + HelpCommand.spacer;
        help += HelpCommand.greenInverse(' USAGE ') + HelpCommand.spacer;
        help += ` ${chalk.gray('$')} ${chalk.green(properties.app.name)} ${chalk.cyan('<commands>')} ${chalk.yellow('[options]')}`;
        help += HelpCommand.spacer;
        help += HelpCommand.cyanInverse(' COMMANDS ') + HelpCommand.spacer;
        const table = AppUtils.createTable();
        Object.keys(commands).forEach((key) => {
            const command = commands[key as keyof typeof commands] as Command<any>;
            const alias = command.alias ? `, ${command.alias}` : '';
            table.push(
                [chalk.cyan(`${key}${alias}`), command.desc],
            );
        });
        help += table.toString() + HelpCommand.spacer;
        help += chalk.dim('For more info on a command type:\n');
        help += chalk.gray('  $ ') + chalk.green(properties.app.name) + chalk.cyan(' help ') + chalk.cyan('<command>');
        return help;
    }
}
