import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FolderItem } from '../FolderItem';
import { FolderProvider } from '../FolderProvider';

export async function createFolder(
    item: FolderItem,
    folderProvider: FolderProvider
): Promise<void> {
    const name = await vscode.window.showInputBox({
        prompt: 'フォルダ名前決定',
        placeHolder: '新しいフォルダー名',
    });

    if (name === undefined || name.trim() === '') {
        return;
    }

    const newPath = path.join(item.folderPath, name.trim());

    try {
        fs.mkdirSync(newPath);
        folderProvider.refresh();
    } catch (err) {
        vscode.window.showErrorMessage(`フォルダーを作れませんでした。：${err}`);
    }
}