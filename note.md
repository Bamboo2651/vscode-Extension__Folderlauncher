# 学習記録
## フェーズ1
### **T-01** `yo code` で TypeScript 拡張テンプレート生成
```
npm install -g yo generator-code
```
-gはグローバルにインストールしている意味です。
yoはプロジェクトのひな型を自動生成するツール、generator-codeはvscode拡張機能の専用テンプレート。
インストールしたら
```
yo code
```
対話形式で質問がでるので、答えて生成する。
質問　選択/入力
What type of extension?New Extension (TypeScript)What's the name?FolderLauncherWhat's the identifier?folder-launcher（自動入力でOK）What's the description?適当でOK（後で変えられる）Initialize git?Yes or No、好みでBundle with webpack?NoPackage manager?npm