- [Markdown Viewer](#markdown-viewer)
- [Develop](#develop)
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

# Develop

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

```
yarn set version latest --yarn-path
```
