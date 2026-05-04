import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FolderItem } from '../FolderItem';
import { FolderProvider } from '../FolderProvider';

export async function deleteFolder(
    item: FolderItem,
    folderProvider: FolderProvider
): Promise<void> {
    const folderName = path.basename(item.folderPath);

    const choice = await vscode.window.showWarningMessage(
        `"${folderName}" and all its contents will be permanently deleted. Are you sure?`,
        { modal: true },
        'Delete'
    );

    if (choice !== 'Delete') {
        return;
    }

    try {
        fs.rmSync(item.folderPath, { recursive: true });
        folderProvider.refresh();
    } catch (err) {
        vscode.window.showErrorMessage(`Failed to delete folder: ${err}`);
    }
}