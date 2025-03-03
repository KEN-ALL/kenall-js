# kenall-js

![](https://github.com/KEN-ALL/kenall-js/workflows/CI/badge.svg)

kenall-js は日本の郵便番号・住所検索APIサービス「[ケンオール](https://kenall.jp/)」のクライアントライブラリです。

APIドキュメントは[こちら](https://ken-all.github.io/kenall-js/ja/)をご覧ください。

## 使い方

kenall-jsはブラウザでそのまま利用可能なスタンドアロンのJavaScriptバンドルとしても、Node.jsのモジュールとしても利用することができます。

### ブラウザで使う場合

スクリプトを利用するHTMLファイルに

```html
<script type="text/javascript" src="スクリプトバンドルの場所"></script>
```

を記載すると、(以降に読み込まれた`<script>`タグの中で) `window`オブジェクトに`kenall`オブジェクトが追加され、`kenall`オブジェクトの`KENALL`プロパティの値として`KENALL`コンストラクタが利用可能になります。コンストラクタに対して`new`を適用することで、`KENALL`オブジェクトを扱うことができるようになります。

スクリプトバンドルは事前にブラウザからアクセス可能な場所にアップロードする必要があることに留意してください。

```html
<script type="text/javascript">
function fill(form) {
  // APIキーはダッシュボードから取得してください
  const k = new kenall.KENALL('API_KEY_DAYO');
  const postalCode = form.elements["postalcode"].value;
  k.getAddress(postalCode).then(
    function (address) {
      const firstCandidate = address.data[0];
      form.elements["prefecture"].value = firstCandidate["prefecture"];
    }
  ).catch(function () {
    alert("API呼び出しに失敗しました");
  });
}
</script>
```

のように利用してください。

なお、最新のスクリプトバンドルのURLとして、以下を使うこともできます。可能な限り問題が発生しないよう配慮しますが、このURLの場所から常にバンドルをダウンロードできるかどうかは保証できません。

* [https://js.kenall.jp/2024-02-09/kenall.js](https://js.kenall.jp/2024-02-09/kenall.js)

以前のバージョン:

* [https://js.kenall.jp/2023-01-15/kenall.js](https://js.kenall.jp/2024-01-15/kenall.js)
* [https://js.kenall.jp/2022-02-11/kenall.js](https://js.kenall.jp/2022-02-11/kenall.js)
* [https://js.kenall.jp/2021-05-28/kenall.js](https://js.kenall.jp/2021-05-28/kenall.js)
* [https://js.kenall.jp/2022-11-25/kenall.js](https://js.kenall.jp/2022-11-25/kenall.js)

### Node.jsで使う場合

プロジェクトのディレクトリで

```
$ npm i @ken-all/kenall
```

を実行します。

```javascript
const { KENALL } = require('@ken-all/kenall');

// APIキーはダッシュボードから取得してください
const api = new KENALL('API_KEY_DAYO');

api.getAddress(postalCode).then(
  r => {
    console.log(r);
  }
).catch(
  e => {
    console.error(e);
  }
);
```

## ビルド方法

```
$ npm run build
```

を実行すると、生成されたjsファイルが`dist/`配下に出力されます。

```
$ npm run bundle
```

を実行すると、ブラウザ向けバンドルファイルが`dist/`配下に出力されます。


## テスト

```
$ npm run test
```

## Examples & Demos

* https://ken-all.github.io/kenall-js-demo/
* https://github.com/KEN-ALL/kenall-js/tree/master/examples
