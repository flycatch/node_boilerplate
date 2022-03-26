import execa from 'execa';
import { log } from '@config';
import { GitService } from '@services/git/git.service';

export default class DefaultGitService implements GitService {
    private static instance: DefaultGitService;

    public static getInstance() {
        if (!DefaultGitService.instance) {
            DefaultGitService.instance = new DefaultGitService();
        }
        return DefaultGitService.instance;
    }

    async init(path: string): Promise<void> {
        log.debug('Initializing git');
        const result = await execa('git', ['init'], {
            cwd: path,
        });
        if (result.failed) {
            throw new Error('failed to initialize git');
        }
    }
}
