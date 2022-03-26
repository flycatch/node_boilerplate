export interface GitService {
    init(path: string): Promise<void>;
}
