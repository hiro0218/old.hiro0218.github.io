Mar-kun
===

## 概要
作者hiro専用のオンラインMarkdownエディタです。<br>自分の使い勝手の良いように実装していきます。

自分のブログ用に最適化されています。

3月に作ったので"Mar-kun"

## デモ
http://hiro0218.github.io/works/editor/

## 仕様
### Markdownパーサ
* [marked](https://github.com/chjj/marked)

### プレビュスタイル
* [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
* [Prism.js](http://prismjs.com)

### 入力補助
* [Behave.js](https://github.com/jakiestfu/Behave.js)

## 更新履歴
### v0.7.0
* Prism.js(コードハイライター) を導入

### v0.6.0
* Behave.js を導入
    * タブ入力(Tabキー・Tab+Shiftキー)、関数内のオートインデント…等に対応
* 自前実装のタブ入力を除去

### v0.5.0
* 変換後の HTML エクスポート機能を実装

### v0.4.1
* Normalize.css を更新

### v0.4.0
* 保存ボタン、クリアボタンを追加

### v0.3.0
* `localStorage`に自動保存・読込するようにした
    * 60秒毎に保存

### v0.2.0
* タブ入力を有効にした

### v0.1.0
* 最低限の機能を実装
