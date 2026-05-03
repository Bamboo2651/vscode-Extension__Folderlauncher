import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FolderItem } from '../FolderItem';
import { FolderProvider } from '../FolderProvider';

export async function renameFolder(
    item: FolderItem,
    folderProvider: FolderProvider
): Promise<void> {
    const currentName = path.basename(item.folderPath);
    const parentPath = path.dirname(item.folderPath);

    const newName = await vscode.window.showInputBox({
        prompt: '新しいフォルダ名決定。',
        value: currentName,
    });

    if (newName === undefined || newName.trim() === '') {
        return;
    }

    const newPath = path.join(parentPath, newName.trim());

    try {
        fs.renameSync(item.folderPath, newPath);
        folderProvider.refresh();
    } catch (err) {
        vscode.window.showErrorMessage(`フォルダ名を変更できませんでした。: ${err}`);
    }
}