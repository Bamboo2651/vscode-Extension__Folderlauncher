import * as vscode from 'vscode';
import { RootManager } from './RootManager';
import { FolderProvider } from './FolderProvider';

export function activate(context: vscode.ExtensionContext) {
    // console.log('FolderLauncher activated');
    const rootManager = new RootManager(context.globalState);
    const folderProvider = new FolderProvider(rootManager)

    const treeView = vscode.window.createTreeView('folderLauncherPanel', {
        treeDataProvider: folderProvider,
        showCollapseAll: true
    });
    context.subscriptions.push(treeView);
}

export function deactivate() {}