Chrome 拡張機能の manifest.json で
web_accessible_resources の matches と
content_scripts の matches で
書ける内容が違うみたいで
web_accessible_resources の matches は <scheme>://<host>/<path> の <path>を書くとエラーで拡張機能が読み込めないみたいなんだけど、それは正しい?

- [マニフェスト - ウェブでアクセス可能なリソース | Chrome Extensions | Chrome for Developers](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources?hl=ja)
- [コンテンツ スクリプト | Chrome for Developers](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts?hl=ja)

単に本当だった

web_accessible_resources の方

> パターンに「/\*」以外のパスがある場合にエラーが発生します
