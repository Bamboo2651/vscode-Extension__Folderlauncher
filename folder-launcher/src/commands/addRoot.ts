import * as vscode from 'vscode';
import { RootManager } from '../RootManager';
import { FolderProvider } from '../FolderProvider';

export async function addRoot(
    rootManager: RootManager,
    folderProvider: FolderProvider
): Promise<void> {
    const uris = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: 'Add as Root',
    });

    if (uris === undefined || uris.length === 0) {
        return;
    }

    await rootManager.addRoot(uris[0].fsPath);
    folderProvider.refresh();
}