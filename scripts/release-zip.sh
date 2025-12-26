#!/bin/bash
set -e
RELEASE_DIR=release
ZIP_DIR=zip
rm -rf "$RELEASE_DIR" "$ZIP_DIR"
mkdir -p "$ZIP_DIR"

# package.jsonのnameフィールドからパッケージ名を取得
PACKAGE_NAME=$(fx '.name' package.json)

# manifest.jsonからバージョン番号を取得
VERSION=$(fx '.version' manifest.json)

ZIP_NAME=$PACKAGE_NAME-$VERSION.zip

PACKAGE_DIR="$RELEASE_DIR/$PACKAGE_NAME/"
mkdir -p "$PACKAGE_DIR"

# 必要ファイルをパッケージ名ディレクトリにコピー
cp -r dist "$PACKAGE_DIR"
cp -r public "$PACKAGE_DIR"
cp manifest.json "$PACKAGE_DIR"
## READMEや他の必要ファイルがあればここで追加

cd "$RELEASE_DIR"
zip -r "../$ZIP_DIR/$ZIP_NAME" "$PACKAGE_NAME"
cd ..
echo "Release ZIP created at $ZIP_DIR/$ZIP_NAME"
