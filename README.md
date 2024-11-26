- [Markdown Viewer](#markdown-viewer)
- [開発者向け](#開発者向け)
  - [サンプルコード](#サンプルコード)
    - [ファイルを開くダイアログ](#ファイルを開くダイアログ)
    - [ローカルファイルの読み込み](#ローカルファイルの読み込み)
    - [パーミッションの追加](#パーミッションの追加)
  - [Run](#run)
  - [change version](#change-version)
  - [build](#build)
  - [update package](#update-package)
  - [update yarn](#update-yarn)

# Markdown Viewer

Markdownファイルを表示するだけ(今のところ)のビューアです。

`Tauri 2.0`での開発のお試しプロジェクトでもあります。\
なので、本アプリは`Tauri 2.0`で開発されています。

https://v2.tauri.app/

# 開発者向け

## サンプルコード

### ファイルを開くダイアログ

```ts:src\app\header.tsx
const selected = await open({
  multiple: false,
  filters: [
    {
      name: 'Markdown',
      extensions: ['md'],
    },
    {
      name: 'All',
      extensions: ['*'],
    },
  ],
})
```

### ローカルファイルの読み込み

```ts:src\app\header.tsx
if (filePath) {
  readTextFile(filePath).then((contents) => setMdContents(contents))
}
```

### パーミッションの追加

ダイアログの`open`と、ファイルの`readTextFile`の為のパーミッションです。

1. `dialog:allow-open`
2. `fs:allow-read-text-file`

```json:src-tauri\capabilities\default.json {10-11} showLineNumbers
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "shell:allow-open",
    "cli:default",
    "dialog:allow-open",
    "fs:allow-read-text-file",
    "fs:allow-watch",
    "fs:allow-unwatch"
  ]
}
```

## Run

```
yarn tauri dev
```

## change version

- package.json > version

## build

```
yarn tauri build
```

## update package

```
yarn upgrade-interactive
```

## update yarn

```sh
yarn set version latest --yarn-path
```
