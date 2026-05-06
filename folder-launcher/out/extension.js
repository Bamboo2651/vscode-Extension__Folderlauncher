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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const RootManager_1 = require("./RootManager");
const FolderProvider_1 = require("./FolderProvider");
const openFolder_1 = require("./commands/openFolder");
const addRoot_1 = require("./commands/addRoot");
const createFolder_1 = require("./commands/createFolder");
const renameFolder_1 = require("./commands/renameFolder");
const deleteFolder_1 = require("./commands/deleteFolder");
const removeRoot_1 = require("./commands/removeRoot");
const EXPANDED_ROOTS_KEY = 'folderLauncher.expandedRoots';
function activate(context) {
    const rootManager = new RootManager_1.RootManager(context.globalState);
    const folderProvider = new FolderProvider_1.FolderProvider(rootManager);
    const treeView = vscode.window.createTreeView('folderLauncherPanel', {
        treeDataProvider: folderProvider,
        showCollapseAll: true
    });
    const expandedRoots = new Set(context.globalState.get(EXPANDED_ROOTS_KEY, []));
    treeView.onDidExpandElement(e => {
        if (e.element.itemType === 'root') {
            expandedRoots.add(e.element.folderPath);
            context.globalState.update(EXPANDED_ROOTS_KEY, [...expandedRoots]);
        }
    });
    treeView.onDidCollapseElement(e => {
        if (e.element.itemType === 'root') {
            expandedRoots.delete(e.element.folderPath);
            context.globalState.update(EXPANDED_ROOTS_KEY, [...expandedRoots]);
        }
    });
    setTimeout(async () => {
        console.log('expandedRoots:', [...expandedRoots]);
        const roots = folderProvider.getChildren();
        console.log('roots:', roots.map(r => r.folderPath));
        for (const rootPath of expandedRoots) {
            const target = roots.find(r => r.folderPath === rootPath);
            console.log('target:', target);
            if (target) {
                await treeView.reveal(target, { expand: true, select: false, focus: false });
            }
        }
    }, 500);
    ;
    const openFolderCmd = vscode.commands.registerCommand('folderLauncher.openFolder', (item) => (0, openFolder_1.openFolder)(item));
    const addRootCmd = vscode.commands.registerCommand('folderLauncher.addRoot', () => (0, addRoot_1.addRoot)(rootManager, folderProvider));
    const createFolderCmd = vscode.commands.registerCommand('folderLauncher.createFolder', (item) => (0, createFolder_1.createFolder)(item, folderProvider));
    const renameFolderCmd = vscode.commands.registerCommand('folderLauncher.renameFolder', (item) => (0, renameFolder_1.renameFolder)(item, folderProvider));
    const deleteFolderCmd = vscode.commands.registerCommand('folderLauncher.deleteFolder', (item) => (0, deleteFolder_1.deleteFolder)(item, folderProvider));
    const removeRootCmd = vscode.commands.registerCommand('folderLauncher.removeRoot', (item) => (0, removeRoot_1.removeRoot)(item, rootManager, folderProvider));
    const refreshCmd = vscode.commands.registerCommand('folderLauncher.refresh', () => folderProvider.refresh());
    context.subscriptions.push(treeView, openFolderCmd, addRootCmd, createFolderCmd, renameFolderCmd, deleteFolderCmd, removeRootCmd, refreshCmd);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map