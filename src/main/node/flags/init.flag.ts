import { constants } from '@constants';
import { BaseFlag, BaseFlag_ } from '@flags/base.flag';

export interface InitFlag extends BaseFlag {
    install: boolean;
    git: boolean;
    target: string;
    skipPrompts: boolean;
}

export const InitFlag_: BaseFlag_<InitFlag> = {
    install: {
        type: 'boolean', alias: 'i', default: false, desc: constants.INIT_INSTALL_FLAG_DESC,
    },
    git: {
        type: 'boolean', alias: 'g', default: false, desc: constants.INIT_GIT_FLAG_DESC,
    },
    skipPrompts: {
        type: 'boolean', alias: 'y', default: false, desc: constants.INIT_YES_FLAG_DESC,
    },
    target: { type: 'string', default: process.cwd(), desc: constants.INIT_TARGET_FLAG_DESC },
};
