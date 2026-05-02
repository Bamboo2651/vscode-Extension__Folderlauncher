import * as vscode from 'vscode';
import { FolderItem } from './FolderItem';

export async function openFolder(item: FolderItem): Promise<void> {
    const choice = await vscode.window.showQuickPick(
        [
            { label: 'Open in Current Window', newWindow: false },
            { label: 'Open in New Window',     newWindow: true  },
        ],
        { placeHolder: `Open "${item.label}"` }
    );

    if (choice === undefined) {
        return; // キャンセル
    }

    const uri = vscode.Uri.file(item.folderPath);
    await vscode.commands.executeCommand('vscode.openFolder', uri, choice.newWindow);
}