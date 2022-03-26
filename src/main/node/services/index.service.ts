import DefaultGitService from '@services/git/default-git.service';
import { GitService } from '@services/git/git.service';
import { ObjectUtils } from '@utils';

export const gitService: GitService = ObjectUtils.lazy(() => DefaultGitService.getInstance());
