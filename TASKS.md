# TASKS.md — FolderLauncher 実装タスク

## フェーズ 1: プロジェクトセットアップ

- [x] **T-01** `yo code` で TypeScript 拡張テンプレート生成
- [x] **T-02** `package.json` の基本情報・エンジンバージョン設定
- [x] **T-03** `tsconfig.json` を strict mode で設定
- [x] **T-04** アクティビティバーアイコン・viewContainer を `package.json` に登録
- [x] **T-05** `extension.ts` に activate / deactivate スタブ作成

---

## フェーズ 2: コアデータ層

- [x] **T-06** `RootManager.ts` — ルートフォルダの CRUD（globalState 永続化）

---

## フェーズ 3: TreeView UI

- [x] **T-07** `FolderItem.ts` — TreeItem サブクラス（通常 / ルート）
- [x] **T-08** `FolderProvider.ts` — TreeDataProvider 実装
- [x] **T-09** `extension.ts` に TreeView を登録・初期化
- [x] **T-10** ルート直下のサブフォルダのみを `fs.readdirSync` で取得するロジック

---

## フェーズ 4: コマンド実装

- [x] **T-11** `openFolder.ts` — 現在 / 新規ウィンドウ選択クイックピック + openFolder 実行
- [x] **T-12** `createFolder.ts` — 名前入力 → `fs.mkdirSync` → リフレッシュ
- [x] **T-13** `renameFolder.ts` — 現在名初期値 → `fs.renameSync` → リフレッシュ
- [x] **T-14** `deleteFolder.ts` — 確認ダイアログ → `fs.rmSync` → リフレッシュ
- [x] **T-15** ルート追加コマンド（フォルダ選択ダイアログ）
- [x] **T-16** ルート削除コマンド

---

## フェーズ 5: コンテキストメニュー・パネルヘッダー

- [x] **T-17** `package.json` menus に右クリックメニュー定義（when 句でアイテム種別分岐）
- [x] **T-18** パネルヘッダーにルート追加 `+` ボタン配置

---

## フェーズ 6: エラーハンドリング・UX

- [ ] **T-19** 存在しないルートパスに警告アイコン表示
- [ ] **T-20** 全コマンドに try-catch + `showErrorMessage`
- [ ] **T-21** 操作後の TreeView 自動リフレッシュ確認

---

## フェーズ 7: パッケージング・動作確認

- [ ] **T-22** F5 でExtension Development Host 起動、全機能の手動テスト
- [ ] **T-23** `vsce package` で `.vsix` 生成
- [ ] **T-24** README.md 作成（英語、使い方・スクリーンショット）
- [ ] **T-25** GitHub リポジトリ公開・Marketplace 申請

---

## 実装順の推奨

```
T-01〜05 → T-06 → T-07〜10 → T-11 → T-12〜16 → T-17〜18 → T-19〜21 → T-22〜25
```

最初の動作確認ポイント: **T-10 完了後**（フォルダ一覧がサイドバーに表示される）