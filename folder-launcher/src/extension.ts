import * as vscode from 'vscode';
import { RootManager } from './RootManager';
import { FolderProvider } from './FolderProvider';
import { openFolder } from './commands/openFolder';
import { FolderItem } from './FolderItem';
import { addRoot } from './commands/addRoot';
import { createFolder } from './commands/createFolder';
import { renameFolder } from './commands/renameFolder';
import { deleteFolder } from './commands/deleteFolder';

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

    const addRootCmd = vscode.commands.registerCommand(
        'folderLauncher.addRoot',
        () => addRoot(rootManager, folderProvider)
    );

    const createFolderCmd = vscode.commands.registerCommand(
        'folderLauncher.createFolder',
        (item: FolderItem) => createFolder(item, folderProvider)
    );

    const renameFolderCmd = vscode.commands.registerCommand(
        'folderLauncher.renameFolder',
        (item: FolderItem) => renameFolder(item, folderProvider)
    );

    const deleteFolderCmd = vscode.commands.registerCommand(
        'folderLauncher.deleteFolder',
        (item: FolderItem) => deleteFolder(item, folderProvider)
    );

    context.subscriptions.push(treeView, openFolderCmd, addRootCmd, createFolderCmd, renameFolderCmd, deleteFolderCmd);
}

export function deactivate() {}