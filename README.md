# FolderLauncher VSCode Extension

## プロジェクト概要

VSCode のプライマリサイドバーにフォルダ管理パネルを追加する拡張機能。
登録済みのルートフォルダ直下のサブフォルダを一覧表示し、ワンクリックで開ける。

## 技術スタック

- **言語**: TypeScript
- **プラットフォーム**: VSCode Extension API（`vscode` モジュール）
- **対象OS**: Windows
- **UI**: TreeView（`vscode.window.createTreeView`）
- **設定永続化**: `vscode.workspace.getConfiguration` / `globalState`

## ディレクトリ構成

```
folder-launcher/
├── src/
│   ├── extension.ts        # activate / deactivate
│   ├── FolderProvider.ts   # TreeDataProvider 実装
│   ├── FolderItem.ts       # TreeItem サブクラス
│   ├── RootManager.ts      # ルートフォルダ CRUD
│   ├── HistoryManager.ts   # 最近開いた履歴管理
│   └── commands/
│       ├── openFolder.ts
│       ├── createFolder.ts
│       ├── renameFolder.ts
│       └── deleteFolder.ts
├── package.json
├── tsconfig.json
└── README.md
```

## コーディング規約

- TypeScript strict mode
- クラスは単一責任（1クラス1役割）
- VSCode API の非同期処理は `async/await`
- エラーは `vscode.window.showErrorMessage` で通知
- マジックナンバー禁止、定数は `constants.ts` に集約

## 開発コマンド

```bash
npm install
npm run compile      # tsc
npm run watch        # tsc --watch
# F5 でExtension Development Host 起動
```

## 重要な制約

- ルートフォルダ直下の**1階層のみ**表示（再帰表示なし）
- フォルダのみ表示（ファイルは非表示）
- Windows パス区切りに対応（`path.win32` 使用可）
