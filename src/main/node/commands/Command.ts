import { MeowConfig } from '@config';
import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface Command<T extends BaseFlag> {
    readonly desc: string;
    readonly usage?: string;
    readonly alias?: string;
    readonly flags: BaseFlag_<T>;
    run(cli: MeowConfig.Cli): Promise<void | any>;
}
