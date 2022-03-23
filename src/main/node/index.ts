#!/usr/bin/env node
import { MeowConfig } from '@config';
import { handleUnhandledErrors } from '@services/error-handler.service';
import { AppUtils } from '@utils';

(async () => {
    handleUnhandledErrors();
    const args = process.argv;
    const command = args.length >= 3 ? AppUtils.getCommand(args[2]) : undefined;
    if (command) {
        const cli = MeowConfig.config(command);
        await command.run(cli);
        process.exit(0);
    }
    throw new Error('command not found');
})();
