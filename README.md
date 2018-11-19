# Starter Kit 2018

フロントエンド開発のボイラープレートです。
基本的にはシンプルに、JavaScriptを最新の標準仕様で書くというところにフォーカスしていますが、
scss→css, ejs→html のコンパイルや、画像最適化等も行います。

* Node.js v10.1.0+
* npm v6.1.0+

## npm scripts

### `npm start`

`./src`以下の開発ソースを監視し、開発サーバを起動します。

### `npm run build`

`./src`以下の開発ソースからプロダクションビルドを行い、`./dist`へ展開します。

## JavaScript

ES2017 (async / awaitあたり) のトランスパイルに加え、

* Object rest spread
* Class-properties
* Decorators

あたりの仕様も組み込んでいます。
また、Lintルールはairbnbのものに則ります。

`./src/assets/js` 直下の`.js`ファイルがすべてエントリーポイントとなりますので、
モジュールは適宜ディレクトリを切って管理してください。

※javaScript周りは主に`webpack`にて取り扱っています。
※`webpack`の`optimization.splitChunks`を有効にしています。
※実験的にTypeScriptもサポートしています。上記同様`./src/assets/js`内の`.ts`ファイルがトランスパイル対象です。
※`@babel/polyfill`をすべてのエントリーポイントでimportしています。

### `optimization.splitChunks` について

現状、`modules.js`として、複数のエントリーポイント間で利用している共通モジュールをバンドルしたファイルを生成します。
このため、エントリーポイントが唯一となるケース（単一LPやSPA）では、これを使用しないように設定してください。詳しくはwebpackの公式ドキュメントを参照してください。

※SPAの場合、フレームワークごとにサポートされているCLIツールを使用されることを推奨します。

## Sass

※JavaScript / TypeScript以外は`gulp@4.0.0`にて取り扱っています。

`./src/assets/sass`以下の`.scss`が`./dist/assets/css`以下へコンパイルされます。
`Autoprefixer`対応済みです。

## EJS

`./src`以下のすべての`.ejs`ファイルは`./dist`へコンパイルされます。

※`.html`ファイルも可能ですが、ejsを推奨します。

## 画像

**ビルド時**に、`./dist`以下の画像ファイルを圧縮します。

---

## 開発環境のカスタマイズ

この環境は主にwebpack, gulpで構築しています。

ユニットテストの追加実装等、webpackを触る際は、`./.webpack`以下のファイルを編集してください。

gulp関連は`./.gulp`以下に格納しています。
