import * as vscode from 'vscode';
import { RootManager } from './RootManager';
import { FolderProvider } from './FolderProvider';
import { openFolder } from './commands/openFolder';
import { FolderItem } from './FolderItem';
import { addRoot } from './commands/addRoot';
import { createFolder } from './commands/createFolder';
import { renameFolder } from './commands/renameFolder';
import { deleteFolder } from './commands/deleteFolder';
import { removeRoot } from './commands/removeRoot';

const EXPANDED_ROOTS_KEY = 'folderLauncher.expandedRoots';

export function activate(context: vscode.ExtensionContext) {
    const rootManager = new RootManager(context.globalState);
    const folderProvider = new FolderProvider(rootManager);

    const treeView = vscode.window.createTreeView('folderLauncherPanel', {
        treeDataProvider: folderProvider,
        showCollapseAll: true
    });

    const expandedRoots = new Set<string>(
        context.globalState.get<string[]>(EXPANDED_ROOTS_KEY, [])
    );
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
    }, 500);;

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

    const removeRootCmd = vscode.commands.registerCommand(
        'folderLauncher.removeRoot',
        (item: FolderItem) => removeRoot(item, rootManager, folderProvider)
    );

    const refreshCmd = vscode.commands.registerCommand(
        'folderLauncher.refresh',
        () => folderProvider.refresh()
    );

    context.subscriptions.push(treeView, openFolderCmd, addRootCmd, createFolderCmd, renameFolderCmd, deleteFolderCmd, removeRootCmd, refreshCmd);
}

export function deactivate() { }