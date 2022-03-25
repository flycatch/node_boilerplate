export const properties = {
    app: {
        name: 'npi',
        desc: 'a command line tool for generating/initializing a node based rest application',
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
    },
};
