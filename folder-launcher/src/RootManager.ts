import * as vscode from 'vscode';

const ROOTS_KEY = 'folderLauncher.roots';

export class RootManager {
    constructor(private readonly state: vscode.Memento) { }

    getRoots(): string[] {
        return this.state.get<string[]>(ROOTS_KEY, []);
    }

    async addRoot(folderPath: string): Promise<void> {
        const roots = this.getRoots();
        if (!roots.includes(folderPath)) {
            await this.state.update(ROOTS_KEY, [...roots, folderPath]);
        }
    }

    async removeRoot(folderPath: string): Promise<void> {
        const roots = this.getRoots().filter(r => r !== folderPath);
        await this.state.update(ROOTS_KEY, roots);
    }
}