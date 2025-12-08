# chrome-title-extension

Chrome の拡張機能の練習。

カレントタブの`<title>`エレメントの innerText を取得して、

- クリップボードにコピーする
- Notification で通知する
- popup(ツールバーのボタン)からは popup も出す

## ビルド手順

```sh
# 依存インストール
pnpm install

# ビルドして, release/ 以下にコピーして、配布用zipを作る
pnpm run release
```

1. `dist/` 配下に `content.global.js` と `popup.global.js`、
2. [release-zip.sh](release-zip.sh) で release 以下に配置され、
3. `release/chrome-title-extension`にデバッグ用のパッケージ、
4. `./chrome-title-extension-<version>.zip` として配布用 zip

が生成されます。

## Chrome 拡張機能 デベロッパーモードでの利用方法

### インストール

1. Chrome で `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を ON にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このパッケージの `./release/chrome-title-extension` を選択 (`manifest.json` のあるところ)

### 更新

1. コードを修正し、再度 `pnpm run release` を実行
2. `chrome://extensions/` で該当拡張機能の「更新」ボタンを押す

### 削除

1. `chrome://extensions/` で該当拡張機能の「削除」ボタンを押す

## 構成

- `src/` ... TypeScript ソース
- `public/` ... popup.html, popup.css, アイコン等
- `dist/` ... ビルド成果物(自動生成)
- `manifest.json` ... Chrome 拡張マニフェスト

## 拡張機能の動作の流れ

1. 新しいページが読み込まれると、`content.ts` がそのページのコンテキストで実行され、`getPageTitle` のハンドラ(Chrome 拡張の特殊なハンドラ)がセットされます。
2. 拡張機能のアイコン(ボタン)がクリックされると、`popup.html` が表示され、そこから `popup.ts` が実行されます。
3. `popup.ts` は、`content.ts` にメッセージ(例えば「タイトルを教えて」など)を送り、`getPageTitle` ハンドラがそのリクエストに応じてページタイトルを返します。その結果を `popup.html` に表示します。

※ 通常の DOM 操作とは異なり、content script と popup は直接同じ DOM や JavaScript オブジェクトを共有できません。メッセージ通信(chrome.runtime.sendMessage など)を使って情報をやり取りします。

## background, popup, content script のちがい

- background(service worker)は、Web ページの DOM や document にアクセスできません。  
  → クリップボード操作や DOM 操作は不可。  
  → 代わりに、content script にメッセージを送ってページ上で処理させる必要があります。
- popup(popup.html)は、一時的な独立ウィンドウで、document は使えますが、  
  → ページ本体の DOM やクリップボード操作は制限されることがある(フォーカスや権限の問題)。
- content script は、Web ページの DOM や document に直接アクセスできるため、
  → クリップボード API や execCommand が使える。

これは Chrome 拡張機能の「セキュリティモデル」と「動作環境の違い」によるものです。

### それ以外

今回は使っていない構成要素メモ:

- オプションページ(options page)  
  拡張機能の設定画面。options.html などで定義し、ユーザーが拡張の設定を変更できます。
- ブラウザアクション・ページアクション  
  拡張機能アイコンの動作や表示方法を制御します(manifest の action や page_action)。
- DevTools ページ  
  Chrome の開発者ツールに独自のパネルや機能を追加できます。
- サイドバーアクション(sidebar action)  
  Chrome のサイドバーに独自 UI を表示できます(新しい API)。
- Web Accessible Resources  
  拡張機能から Web ページに公開する静的ファイル(画像、CSS など)。
- マニフェストファイル(manifest.json)
  拡張機能全体の設定・権限・構成を記述します。
- ホストパーミッション・外部通信
  外部サイトとの通信や権限管理も拡張の一部です。
