# TASKS.md — FolderLauncher 実装タスク

## フェーズ 1: プロジェクトセットアップ

- [x] **T-01** `yo code` で TypeScript 拡張テンプレート生成
- [ ] **T-02** `package.json` の基本情報・エンジンバージョン設定
- [ ] **T-03** `tsconfig.json` を strict mode で設定
- [ ] **T-04** アクティビティバーアイコン・viewContainer を `package.json` に登録
- [ ] **T-05** `extension.ts` に activate / deactivate スタブ作成

---

## フェーズ 2: コアデータ層

- [ ] **T-06** `RootManager.ts` — ルートフォルダの CRUD（globalState 永続化）
- [ ] **T-07** `HistoryManager.ts` — 履歴の追加・削除・上限管理
- [ ] **T-08** `FavoritesManager.ts` — お気に入りの追加・解除・一覧取得

---

## フェーズ 3: TreeView UI

- [ ] **T-09** `FolderItem.ts` — TreeItem サブクラス（通常 / ルート / お気に入り / 履歴）
- [ ] **T-10** `FolderProvider.ts` — TreeDataProvider 実装（3 セクション構成）
- [ ] **T-11** `extension.ts` に TreeView を登録・初期化
- [ ] **T-12** ルート直下のサブフォルダのみを `fs.readdirSync` で取得するロジック

---

## フェーズ 4: コマンド実装

- [ ] **T-13** `openFolder.ts` — 現在 / 新規ウィンドウ選択クイックピック + openFolder 実行
- [ ] **T-14** `createFolder.ts` — 名前入力 → `fs.mkdirSync` → リフレッシュ
- [ ] **T-15** `renameFolder.ts` — 現在名初期値 → `fs.renameSync` → リフレッシュ
- [ ] **T-16** `deleteFolder.ts` — 確認ダイアログ → `fs.rmSync` → リフレッシュ
- [ ] **T-17** お気に入り追加・解除コマンド
- [ ] **T-18** 履歴から削除コマンド
- [ ] **T-19** ルート追加コマンド（フォルダ選択ダイアログ）
- [ ] **T-20** ルート削除コマンド

---

## フェーズ 5: コンテキストメニュー・パネルヘッダー

- [ ] **T-21** `package.json` menus に右クリックメニュー定義（when 句でアイテム種別分岐）
- [ ] **T-22** パネルヘッダーにルート追加 `+` ボタン配置

---

## フェーズ 6: エラーハンドリング・UX

- [ ] **T-23** 存在しないルートパスに警告アイコン表示
- [ ] **T-24** 全コマンドに try-catch + `showErrorMessage`
- [ ] **T-25** 操作後の TreeView 自動リフレッシュ確認

---

## フェーズ 7: パッケージング・動作確認

- [ ] **T-26** F5 でExtension Development Host 起動、全機能の手動テスト
- [ ] **T-27** `vsce package` で `.vsix` 生成
- [ ] **T-28** README.md 作成（使い方・スクリーンショット）

---

## 実装順の推奨

```
T-01〜05 → T-06〜08 → T-09〜12 → T-13 → T-14〜20 → T-21〜22 → T-23〜25 → T-26〜28
```

最初の動作確認ポイント: **T-12 完了後**（フォルダ一覧がサイドバーに表示される）
