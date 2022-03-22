import {
    cyan, green, red,
} from 'chalk';
import { properties } from '@properties';

const levels = ['ERROR', 'INFO', 'DEBUG'] as const;

type LogLevel = typeof levels[number];

export const log = (level: LogLevel = 'INFO', ...msg: any[]) => {
    let index = levels.indexOf(properties.log.level as LogLevel);
    index = index === -1 ? levels.indexOf('ERROR') : index;
    if (levels.indexOf(level) <= index) {
        switch (level) {
            case 'INFO':
                console.log(green.inverse.bold(` ${level} `), ...(msg.map((m) => green(m))));
                return;
            case 'DEBUG':
                console.log(cyan.inverse.dim.bold(` ${level} `), ...(msg.map((m) => cyan(m))));
                return;
            case 'ERROR':
                console.log(red.inverse.bold(` ${level} `), ...msg.map((m) => red(m)));
                return;
            default:
                throw new Error('invalid level');
        }
    }
};
