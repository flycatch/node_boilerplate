import { MeowConfig } from '@config';

export interface BaseFlag {
    [key: string]: any;
}

export type BaseFlag_<T extends BaseFlag> = {
    [key in keyof T]: MeowConfig.Flag;
};
