"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootManager = void 0;
const ROOTS_KEY = 'folderLauncher.roots';
class RootManager {
    state;
    constructor(state) {
        this.state = state;
    }
    getRoots() {
        return this.state.get(ROOTS_KEY, []);
    }
    async addRoot(folderPath) {
        const roots = this.getRoots();
        if (!roots.includes(folderPath)) {
            await this.state.update(ROOTS_KEY, [...roots, folderPath]);
        }
    }
    async removeRoot(folderPath) {
        const roots = this.getRoots().filter(r => r !== folderPath);
        await this.state.update(ROOTS_KEY, roots);
    }
}
exports.RootManager = RootManager;
//# sourceMappingURL=RootManager.js.map