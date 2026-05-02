import * as vscode from 'vscode';
import { FolderItem } from '../FolderItem';

export async function openFolder(item: FolderItem): Promise<void> {
    const choice = await vscode.window.showQuickPick(
        [
            { label: '現在のウィンドウで開く', newWindow: false },
            { label: '新しいウィンドウで開く',     newWindow: true  },
        ],
        { placeHolder: `Open "${item.label}"` }
    );

    if (choice === undefined) {
        return; // キャンセル
    }

    const uri = vscode.Uri.file(item.folderPath);
    await vscode.commands.executeCommand('vscode.openFolder', uri, choice.newWindow);
}