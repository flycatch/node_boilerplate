import Table from 'cli-table3';
import { Command } from '@commands/Command';
import { commands } from '@commands/index.commands';

export class AppUtils {
    static getCommand(cmd?: string): Command | undefined {
        const args = process.argv;
        let command = cmd;
        if (args.length >= 3) {
            command = command || args[2];
            if (command in commands) {
                return commands[command as keyof typeof commands];
            }
            return Object.values(commands).map((c) => (c as Command)).find((c) => c.alias && c.alias === command);
        }
        return undefined;
    }

    static createTable() {
        return new Table({
            chars: {
                top: '',
                'top-left': '',
                'top-mid': '',
                'top-right': '',
                bottom: '',
                'bottom-left': '',
                'bottom-mid': '',
                'bottom-right': '',
                left: '',
                'left-mid': '',
                right: '',
                'right-mid': '',
                mid: '',
                'mid-mid': '',
                middle: '',
            },
            style: {
                'padding-left': 0,
                'padding-right': 4,
            },
            wordWrap: true,
        });
    }
}
