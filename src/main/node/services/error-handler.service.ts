import { log } from '@config';

export const handleError = (err: Error | { [key in string]: any } | undefined | null, exit = false) => {
    log.error(err);
    if (exit) {
        process.exit(0);
    }
};

export const handleUnhandledErrors = () => {
    process.on('unhandledRejection', (err) => {
        handleError(err, true);
    });
};
