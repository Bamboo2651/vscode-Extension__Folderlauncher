import * as vscode from 'vscode';

export class FolderItem extends vscode.TreeItem {
    constructor(
        label: string,
        public readonly folderPath: string,
        public readonly itemType: 'root' | 'folder'
    ) {
        super(label);

        if (itemType === 'root') {
            this.iconPath = new vscode.ThemeIcon('root-folder');
            this.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
        } else {
            this.iconPath = new vscode.ThemeIcon('folder');
            this.command = {
                command: 'folderLauncher.openFolder',
                title: 'Open Folder',
                arguments: [this], 
            };
        }
    }
}