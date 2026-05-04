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
        `"${folderName}" を削除しようとしています、本当に削除しますか？`,
        { modal: true },
        '削除'
    );

    if (choice !== '削除') {
        return;
    }

    try {
        fs.rmSync(item.folderPath, { recursive: true });
        folderProvider.refresh();
    } catch (err) {
        vscode.window.showErrorMessage(`フォルダの削除に失敗しました: ${err}`);
    }
}