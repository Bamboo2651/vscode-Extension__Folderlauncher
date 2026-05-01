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

cd .\folder-launcher\
code .
F5を押して新しいウィンドウでvscodeを開いたら成功。

export function activate(context: vscode.ExtensionContext) {
activate :拡張機能が起動したときに呼ばれる。
deactivate :拡張機能が終了するときに呼ばれる。

t-02
"viewsContainers": {
    "activitybar": [
        {
            "id": "folderLauncher",
            "title": "FolderLauncher",
            "icon": "$(folder)"
        }
    ]
},
アクティビティバーに表示されるアイコンを追加する設定のコード。
"views": {
    "folderLauncher": [
        {
            "id": "folderLauncherPanel",
            "name": "FolderLauncher"
        }
    ]
},
アイコンをクリックしたときに表示されるパネルの定義

t-03
"strict": trueが入っていたので、t-03は終わり、
strict mode：曖昧な書き方をエラーにする設定。方注釈を省略したり、nullの可能性を無視したりするとコンパイルエラーになる。

t-04
f5で開いてアクティビティバーにアイコンが表示されたらOK

t-05
extension.tsの骨組みを書く。

t-08
TreeDataProviderとは？
vscodeのtreeViewは「データを表示する方法を知っている人(provider)」が必要。私がtreedataproviderインターフェースを実装したクラスを作ると、vscodeがそれを呼び出して、サイドバーに描画してくれる。
実装すべきもの
TreeDataProviderには2つのメソッドが必須。
getChildren(element?)：子要素のリストを返す。
getTreeItem(element)：要素をTreeItemに変換して返す。
今作っているFolderLauncherの場合：
getChildren(undefined) → ルートフォルダ一覧を返す
getChildren(rootItem) → そのルート直下のサブフォルダ一覧を返す

t-09
activate()の中でやること
activate(
    RootManagerを作る。
    FolderProviderを作る。(RootMagerを渡す。)
    TreeViewを作る。(FolderProviderを渡す。)
    context.subscriptionsに登録する。(拡張が無効化された時に自動で破棄されるようにするために。)
)

t-10
t-08のときに終わってるから今回はパス。