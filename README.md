# kenall-js

## install

```
$ npm i kenall
```

## build

```
$ npx ttsc
```

## test

```
$ npx jest
```

## Usage

```javascript
const { KENALL } = require('kenall');

// APIキーはダッシュボードから取得してください
(new KENALL({API_KEY_DAYO})).then(r => {
  console.log(r);
}).catch(e => {
  console.error(e);
})
```

## Examples & Demos

* [API呼び出しのサンプル (CodePen)](https://codepen.io/kenall/pen/NWbPYda)
* https://github.com/KEN-ALL/kenall-js/tree/master/examples