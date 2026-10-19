# kenall-js

![](https://github.com/KEN-ALL/kenall-js/workflows/CI/badge.svg)

kenall-js は日本の郵便番号・住所検索APIサービス「[ケンオール](https://kenall.jp/)」のクライアントライブラリです。

APIドキュメントは[こちら](https://ken-all.github.io/kenall-js/ja/)をご覧ください。

## 使い方

kenall-jsはブラウザでそのまま利用可能なスタンドアロンのJavaScriptバンドルとしても、Node.jsのモジュールとしても利用することができます。

### ブラウザで使う場合

> [!NOTE]
> v2.0.0より、Internet Explorerはサポートされなくなりました。

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

* [https://js.kenall.jp/2026-08-25/kenall.js](https://js.kenall.jp/2026-08-25/kenall.js)

以前のバージョン:

* [https://js.kenall.jp/2026-07-13/kenall.js](https://js.kenall.jp/2026-07-13/kenall.js)
* [https://js.kenall.jp/2026-05-11/kenall.js](https://js.kenall.jp/2026-05-11/kenall.js)
* [https://js.kenall.jp/2026-04-15/kenall.js](https://js.kenall.jp/2026-04-15/kenall.js)
* [https://js.kenall.jp/2026-03-31/kenall.js](https://js.kenall.jp/2026-03-31/kenall.js)
* [https://js.kenall.jp/2025-07-29/kenall.js](https://js.kenall.jp/2025-07-29/kenall.js)
* [https://js.kenall.jp/2025-03-03/kenall.js](https://js.kenall.jp/2025-03-03/kenall.js)
* [https://js.kenall.jp/2024-04-05/kenall.js](https://js.kenall.jp/2024-04-05/kenall.js)
* [https://js.kenall.jp/2024-02-09/kenall.js](https://js.kenall.jp/2024-02-09/kenall.js)
* [https://js.kenall.jp/2024-01-15/kenall.js](https://js.kenall.jp/2024-01-15/kenall.js)
* [https://js.kenall.jp/2022-11-25/kenall.js](https://js.kenall.jp/2022-11-25/kenall.js)
* [https://js.kenall.jp/2022-02-11/kenall.js](https://js.kenall.jp/2022-02-11/kenall.js)
* [https://js.kenall.jp/2021-05-28/kenall.js](https://js.kenall.jp/2021-05-28/kenall.js)

#### バンドルの検証

配布しているバンドルのSHA-384ダイジェストを以下に掲載します。ダウンロードしたファイルが我々が公開したものと同一であることを確認するために利用してください。

```
$ curl -s https://js.kenall.jp/2026-08-25/kenall.js | openssl dgst -sha384 -binary | openssl base64 -A
NWNItGymmaDpiPW267sOuu1fjDQrO8DEMJ0RDsxlV5nYDQijSUR+Z/BuYJETxaEh
```

| バンドル | バージョン | ダイジェスト |
| --- | --- | --- |
| 2026-08-25 | v2.6.0 | `sha384-NWNItGymmaDpiPW267sOuu1fjDQrO8DEMJ0RDsxlV5nYDQijSUR+Z/BuYJETxaEh` |
| 2026-07-13 | v2.5.0 | `sha384-rRkg+O195Y5HhTEmtkr16pcaAymKqSh1VMOvaX10QCaQR7wt16x0VB5hB4nUiMxI` |
| 2026-05-11 | v2.4.0 | `sha384-FsIxgYCG+goBmwuJdspexqbuq4X+fkvR2JWqXe7H6IM6v6IWUm1MR2XhXBYGtEid` |
| 2026-04-15 | v2.3.1 | `sha384-PyTTUMQfYXRbUWeP7A45P13hLrQQvDutQw04PIH2DnQBD9dqUwVO4PD1KMnkk1+O` |
| 2026-03-31 | v2.3.0 | `sha384-sjplGluMYZ9bdtbygsHmW6ceIcIyfb8x2tk3XDwWyqmlFo6cXRaSQw4OaoHSZlzd` |
| 2025-07-29 | v2.2.0 | `sha384-pk6HO8dcbUQjrSr/h3d5Qo+yboR8ialYflx5XLziu+mNWZ2VbzdnZuHpLDrnPbMI` |
| 2025-03-03 | v2.0.2 | `sha384-22xzS3h2lyHd03wVaI1bXagi26pBz3dmEZtjeafr9pC7dMZshwDf23VYmvs1tVA9` |
| 2024-04-05 | v1.9.1 | `sha384-JKqK06lGVbyfjNXUc6DlfgOshYyvxsj13CvDlF1z3775pXKug9Z8SflqpZ0xyfqk` |
| 2024-02-09 | v1.9.0 | `sha384-RodYHbmzUhi6bf5NFFs+ryuowGeE4TScVxrF0D0wkQfptfnmA7iotMov6dhh9T7D` |
| 2024-01-15 | v1.8.0 | `sha384-yXu/QCY5KdpxBb05LShova2b5MGORjOLXKTt9DvVd8eNgYgNRRJcUKE304y5OSz+` |
| 2022-11-25 | v1.7.1 | `sha384-nAwLAkh27N0+NkFDSVCK8HxUzrI5flz5CyTFmvGj+AlV33ayUP80UjXlCeCPNq2J` |
| 2022-02-11 | v1.6.0 | `sha384-GWECS8KUC7mtF4Xh//+4u74HvfLtYWD4zvy9OUsBNruRoxJfWUQl+CYuWaxqBocC` |
| 2021-05-28 | v1.1.0 | `sha384-laNMxLo6r+Jm1XnJAS0rVWC0YmiK5vJYf6EHY4t1R6gYAe4x/JzP/u/YecRUNdeQ` |

> [!NOTE]
> ダイジェストは [Subresource Integrity](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity) で使われる `sha384-BASE64` 形式で記載していますが、`js.kenall.jp` を参照する `<script>` タグに `integrity` 属性を付けても現時点では動作しません。クロスオリジンのサブリソースに対する整合性検証にはレスポンスにCORSヘッダが必要ですが、`js.kenall.jp` は現在これを返していないためです。SRIが必要な場合は、上記の表でダイジェストを検証した上で、バンドルを自分のサーバに配置してご利用ください。

また、v2.7.0以降はバンドルが再現可能(reproducible)になっています。ビルド時刻としてコミット日時を埋め込むようになったため、同じタグを自分でビルドすればバイト単位で同一のファイルが得られ、公開されているバンドルがソースと一致することを検証できます。

```
$ git checkout v2.7.0 && npm ci && npm run bundle
$ openssl dgst -sha384 -binary dist/bundle.js | openssl base64 -A
```

### Node.jsで使う場合

`@ken-all/kenall` は Node.js 環境ではネイティブの Fetch API を利用するため、
Node.js 20 以降が必要です。

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
