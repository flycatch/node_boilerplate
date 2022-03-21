#!/usr/bin/env node
import { Command } from "./commands/Command";
import { handleUnhandledErrors } from "./services/error-handler.service";
import { AppUtils } from "./utils/app.utils";
import { getCli } from "./utils/cli.utils";

(async () => {
    handleUnhandledErrors();
    const command: Command | undefined = AppUtils.getCommand();
    if (command) {
        const cli = getCli(command);
        await command.run(cli);
        process.exit(0);
    }
    throw new Error("command not found");
})();
