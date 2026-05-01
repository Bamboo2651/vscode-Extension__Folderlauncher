import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FolderItem } from './FolderItem';
import { RootManager } from './RootManager';

export class FolderProvider implements vscode.TreeDataProvider<FolderItem>{
    private readonly _onDidChangeTreeData = new vscode.EventEmitter<void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private readonly rootManager: RootManager) { }
    
    refresh(): void{
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(item: FolderItem): FolderItem{
        return item;
    }

    getChildren(item?: FolderItem): FolderItem[] {
        if (item === undefined) {
            return this.getRootItems();
        }
        if (item.itemType === 'root') {
            return this.getSubFolderItems(item.folderPath);
        }
        return [];
    }

    //プライベート
    private getRootItems(): FolderItem[]{
        return this.rootManager.getRoots().map(
            rootPath => new FolderItem(path.basename(rootPath), rootPath, 'root')
        );
    }
    private getSubFolderItems(rootPath: string): FolderItem[]{
        if (!fs.existsSync(rootPath)) {
            vscode.window.showErrorMessage(`パスが見つからない。:${rootPath}`);
            return [];
        }

        return fs.readdirSync(rootPath, { withFileType: true })
            .filter(entry => entry.isDirectory())
            .map(entry => {
                const fullPath = path.join(rootPath, entry.name);
                return new FolderItem(entry.name, fullPath, 'folder');
            });
    }

}