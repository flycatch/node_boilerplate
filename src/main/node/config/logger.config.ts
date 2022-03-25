import { cyan, green, red } from 'chalk';
import winston from 'winston';
import { properties } from '@properties';

const logLevels = {
    error: 0,
    print: 1,
    info: 2,
    debug: 3,
} as const;

interface CustomLogger extends winston.Logger {
    error: winston.LeveledLogMethod;
    print: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod,
    debug: winston.LeveledLogMethod,
}

export const log = <CustomLogger>winston.createLogger({
    level: properties.log.level,
    levels: logLevels,
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.printf(({ level, message }) => {
            switch (level.toLocaleLowerCase()) {
                case 'info': return `${green.inverse.bold(` ${level.toLocaleUpperCase()} `)} ${green(message)}`;
                case 'debug': return `${cyan.inverse.dim.bold(` ${level.toLocaleUpperCase()} `)} ${cyan(message)}`;
                case 'error': return `${red.inverse.bold(` ${level.toLocaleUpperCase()} `)} ${red(message)}`;
                case 'print': return message;
                default: return '';
            }
        }),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});
