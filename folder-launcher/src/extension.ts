import * as vscode from 'vscode';
import { RootManager } from './RootManager';
import { FolderProvider } from './FolderProvider';
import { openFolder } from './commands/openFolder';
import { FolderItem } from './FolderItem';

export function activate(context: vscode.ExtensionContext) {
    const rootManager = new RootManager(context.globalState);
    const folderProvider = new FolderProvider(rootManager);

    const treeView = vscode.window.createTreeView('folderLauncherPanel', {
        treeDataProvider: folderProvider,
        showCollapseAll: true
    });

    const openFolderCmd = vscode.commands.registerCommand(
        'folderLauncher.openFolder',
        (item: FolderItem) => openFolder(item)
    );

    context.subscriptions.push(treeView, openFolderCmd);
}

export function deactivate() {}