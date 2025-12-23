# Copilot 利用ガイドライン(chrome-title-extension)

このリポジトリでは、[GitHub Copilot](https://github.com/features/copilot) を利用する際、以下の方針・ルールに従ってください。

## 推奨事項

- **既存の設計・構成を尊重すること**
  - `src/` ディレクトリ配下の TypeScript ソースを中心に編集してください。
  - `public/` には popup.html, popup.css, アイコン等の静的ファイルを配置します。
  - `dist/` はビルド成果物なので直接編集しないでください。

- **Chrome 拡張のセキュリティモデルを理解すること**
  - background, popup, content script それぞれの役割・制約を守ってください。
  - DOM やクリップボード操作は content script か popup でのみ行うこと。

- **メッセージ通信を活用すること**
  - content script と popup/background 間のやり取りは `chrome.runtime.sendMessage` などを使うこと。

- **TypeScript の型安全性を維持すること**
  - 可能な限り型注釈を付与し、`tsconfig.json` の strict 設定を尊重してください。

## 禁止事項

- `dist/` 配下のファイルを直接編集しないこと
- セキュリティ上問題のあるコード(eval, インジェクション等)を生成しないこと
- 外部 API や Web サイトへの不要な通信を追加しないこと

## コーディングスタイル

- フォーマット・リントは [biome](https://biomejs.dev/) で統一しています。
- `pnpm format` / `pnpm lint` でエラーが出ないようにしてください。

## ビルド・リリース

- 依存インストール: `pnpm install`
- ビルド: `pnpm run build`
- リリース用 zip 作成: `pnpm run release`

## 参考

- [README.md](../README.md)
- [manifest.json](../manifest.json)
- [release-zip.sh](../release-zip.sh)

---
このファイルは自動生成されました。
