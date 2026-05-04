import * as vscode from 'vscode';
import { FolderItem } from '../FolderItem';
import { RootManager } from '../RootManager';
import { FolderProvider } from '../FolderProvider';

export async function removeRoot(
    item: FolderItem,
    rootManager: RootManager,
    folderProvider: FolderProvider
): Promise<void> {
    const choice = await vscode.window.showWarningMessage(
        `削除： "${item.label}" ルートフォルダから削除しますか？`,
        { modal: true },
        '削除'
    );

    if (choice !== '削除') {
        return;
    }

    await rootManager.removeRoot(item.folderPath);
    folderProvider.refresh();
}