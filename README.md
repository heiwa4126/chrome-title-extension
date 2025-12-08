# chrome-title-extension

Chrome の拡張機能の練習。

[すべてのページでスクリプトを実行する | Get started | Chrome for Developers](https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab?hl=ja) を TypeScript で書いたもの

## ビルド手順

```sh
# 依存インストール
pnpm install

# ビルド
pnpm build
```

`dist/` 配下に `content.global.js` と `popup.global.js` が生成されます。

## リリース用 ZIP の作成

バージョン付きのリリース ZIP をプロジェクトルートに作成できます。

```sh
pnpm run release:zip
# 例: chrome-title-extension-1.0.0.zip が生成されます
```

ZIP 内には chrome-title-extension ディレクトリ配下に全ファイルがまとまっています。
ZIP のポストフィックスのバージョン番号は `manifest.json` から取得します。

## Chrome 拡張機能 デベロッパーモードでの利用方法

### インストール

1. Chrome で `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を ON にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このリポジトリのルートディレクトリ(`manifest.json`がある場所)を選択

### 更新

1. コードを修正し、再度 `pnpm build` を実行
2. `chrome://extensions/` で該当拡張機能の「更新」ボタンを押す

### 削除

1. `chrome://extensions/` で該当拡張機能の「削除」ボタンを押す

## 構成

- `src/` ... TypeScript ソース
- `public/` ... popup.html, popup.css, アイコン等
- `dist/` ... ビルド成果物(自動生成)
- `manifest.json` ... Chrome 拡張マニフェスト
