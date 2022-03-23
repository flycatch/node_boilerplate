import { MeowConfig } from '@config';

export interface Command {
    readonly desc: string;
    readonly usage?: string;
    readonly alias?: string;
    readonly flags: Record<string, MeowConfig.Flag>;
    run(cli: MeowConfig.Cli): Promise<void | any>;
}
