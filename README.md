# chrome-title-extension

Chrome の拡張機能の練習。

カレントタブの`<title>`エレメントの innerText を取得して、表示する。

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
