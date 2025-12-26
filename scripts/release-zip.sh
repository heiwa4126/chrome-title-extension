#!/bin/bash
set -e
RELEASE_DIR=release
ZIP_DIR=zip

# package.jsonのnameフィールドからパッケージ名を取得
PACKAGE_NAME=$(fx '.name' package.json)

# package.jsonのversionフィールドからバージョン番号を取得
# これをあとで manifest.json にも反映させる
VERSION=$(fx '.version' package.json)

# manifest.json のバージョンは 9.9.9 形式で、pre-version はダメ
# VERSION から pre-version を取り除いて対処する。それでもだめならエラーにしてexit 1で停止
MANIFEST_VERSION=$(echo "$VERSION" | sed -E 's/^([0-9]+\.[0-9]+\.[0-9]+).*/\1/')

## バージョンが正しい形式か検証 (数字.数字.数字)
if ! echo "$MANIFEST_VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
	echo "Error: Invalid version format: $VERSION" >&2
	echo "manifest.json requires semantic version format (e.g., 1.0.0)" >&2
	exit 1
fi

# 作業ディレクトリ用意
rm -rf "$RELEASE_DIR" "$ZIP_DIR"
mkdir -p "$ZIP_DIR"

PACKAGE_DIR="$RELEASE_DIR/$PACKAGE_NAME/"
mkdir -p "$PACKAGE_DIR"

ZIP_NAME=$PACKAGE_NAME-$VERSION.zip

# 必要ファイルをパッケージ名ディレクトリにコピー
cp -r dist "$PACKAGE_DIR"
cp -r public "$PACKAGE_DIR"
cp manifest.json "$PACKAGE_DIR"

# manifest.json のバージョンを package.json のバージョンに更新
fx "$PACKAGE_DIR/manifest.json" "x.version = \"$MANIFEST_VERSION\", x" save
echo "Updated manifest.json version to $MANIFEST_VERSION (from package.json: $VERSION)"

## READMEや他の必要ファイルがあればここで追加

cd "$RELEASE_DIR"
zip -r "../$ZIP_DIR/$ZIP_NAME" "$PACKAGE_NAME"
cd ..
echo "Release ZIP created at $ZIP_DIR/$ZIP_NAME"
