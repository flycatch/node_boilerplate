import { Cli, Flag } from "../utils/cli.utils";

export interface Command {
    readonly desc: string;
    readonly usage?: string;
    readonly alias?: string;
    readonly flags: Record<string, Flag>;
    run(cli: Cli): Promise<void | any>;
}
