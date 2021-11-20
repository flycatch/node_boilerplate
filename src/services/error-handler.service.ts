import { log } from "./log.service";


export const handleError = (err: Error | { [key in string]: any } | undefined | null, exit: boolean = false) => {
    log("ERROR", err?.message);
    if (exit) {
        process.exit(0);
    }
};

export const handleUnhandledErrors = () => {

    process.on('unhandledRejection', err => {
        handleError(err, true);
    })

};