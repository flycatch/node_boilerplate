import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import inquirer from 'inquirer';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';
import { log, MeowConfig } from '@config';
import { Command } from '@commands/Command';

const copy = promisify(ncp);
type Template = 'typescript' | 'javascript';

type Options = {
    skipPrompts: boolean;
    runInstall: boolean;
    initGit: boolean;
    template?: Template;
    target?: string;
};

export class InitCommand implements Command {
    readonly defaultTemplate: Template = 'typescript';

    constructor(
        readonly desc: string = 'initialize current directory for a node web api project',
        readonly flags: Record<string, MeowConfig.Flag> = {
            install: {
                type: 'boolean', alias: 'i', default: false, desc: 'install packages via npm',
            },
            git: {
                type: 'boolean', alias: 'g', default: false, desc: 'initialize as a new git repository',
            },
            yes: {
                type: 'boolean', alias: 'y', default: false, desc: 'use default options',
            },
            target: {
                type: 'string', default: 'current working directory', desc: 'target folder to generate project',
            },
        },
    ) { }

    async run(cli: MeowConfig.Cli) {
        let options = this.parseFlags(cli);
        options = await this.prompt(options);
        options.target = options.target === this.flags.target.default ? process.cwd() : options.target;
        options.template = options.template || this.defaultTemplate;

        await new Listr([
            {
                title: 'initializing the project',
                task: () => this.initProject(options),
            },
            {
                title: 'initializing a new git repository',
                task: () => this.initGit(options),
                enabled: () => options.initGit,
            },
            {
                title: 'installing dependencies',
                task: () => projectInstall({ cwd: options.target }),
                enabled: () => options.runInstall,
            },
        ]).run();
        log.info(`${chalk.green.inverse.bold(' DONE ')} project ready`);
    }

    private async initGit(options: Options) {
        log.debug('initializing git');
        const result = await execa('git', ['init'], {
            cwd: options.target,
        });
        if (result.failed) {
            throw new Error('failed to initialize git');
        }
    }

    private async initProject(options: Options) {
        log.debug('options', JSON.stringify(options));
        log.debug(`initilizing ${options.template} npi project`);
        const templateDir = path.resolve(__dirname, '../../../templates', options.template as string);
        await copy(templateDir, options.target as string, { clobber: true });
        await fs.promises.readFile(path.join(options.target as string, 'package.json'))
            .then((pkg) => {
                const p = JSON.parse(pkg.toString());
                p.name = path.basename(options.target as string);
                return fs.promises.writeFile(path.join(options.target as string, 'package.json'), JSON.stringify(p, null, 2));
            })
            .catch((_err) => { });
        log.debug(`${chalk.green.bold('DONE')} project initialized`);
    }

    private parseFlags(cli: MeowConfig.Cli): Options {
        const { flags } = cli;
        return {
            skipPrompts: (flags.yes as boolean),
            runInstall: (flags.install as boolean),
            initGit: (flags.git as boolean),
            target: (flags.target as string),
        };
    }

    private async prompt(options: Options) {
        if (options.skipPrompts) {
            return options;
        }
        const prompts: inquirer.QuestionCollection<Options>[] = [];
        if (!options.initGit) {
            prompts.push({
                type: 'confirm',
                name: 'initGit',
                message: 'Initialize a git repository?',
                default: this.flags.git.default,
            });
        }

        if (!options.runInstall) {
            prompts.push({
                type: 'confirm',
                name: 'runInstall',
                message: 'Install node packages?',
                default: this.flags.install.default,
            });
        }

        const opt = await inquirer.prompt(prompts);
        return {
            ...options,
            ...opt,
        };
    }
}
