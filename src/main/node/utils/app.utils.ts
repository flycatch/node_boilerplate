import Table from 'cli-table3';
import { Command } from '@commands/Command';
import { commands } from '@commands/index.commands';

export const getCommand = (cmd?: string): Command<any> | undefined => {
    if (cmd) {
        if (cmd in commands) {
            return commands[cmd as keyof typeof commands];
        }
        return Object.values(commands).map((c) => c as Command<any>).find((c) => c.alias && c.alias === cmd);
    }
    return undefined;
};

export const createTable = () => new Table({
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
