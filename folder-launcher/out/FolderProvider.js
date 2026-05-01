"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderProvider = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const FolderItem_1 = require("./FolderItem");
class FolderProvider {
    rootManager;
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    constructor(rootManager) {
        this.rootManager = rootManager;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(item) {
        return item;
    }
    getChildren(item) {
        if (item === undefined) {
            return this.getRootItems();
        }
        if (item.itemType === 'root') {
            return this.getSubFolderItems(item.folderPath);
        }
        return [];
    }
    //プライベート
    getRootItems() {
        return this.rootManager.getRoots().map(rootPath => new FolderItem_1.FolderItem(path.basename(rootPath), rootPath, 'root'));
    }
    getSubFolderItems(rootPath) {
        if (!fs.existsSync(rootPath)) {
            vscode.window.showErrorMessage(`パスが見つからない。:${rootPath}`);
            return [];
        }
        return fs.readdirSync(rootPath, { withFileTypes: true })
            .filter(entry => entry.isDirectory())
            .map(entry => {
            const fullPath = path.join(rootPath, entry.name);
            return new FolderItem_1.FolderItem(entry.name, fullPath, 'folder');
        });
    }
}
exports.FolderProvider = FolderProvider;
//# sourceMappingURL=FolderProvider.js.map