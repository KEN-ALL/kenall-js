# kenall-js

![](https://github.com/KEN-ALL/kenall-js/workflows/CI/badge.svg)

## What's this?

kenall-js is a JavaScript client library for [KEN ALL](https://kenall.jp/), Japan postal code to address translation API service.

API document is [here](https://ken-all.github.io/kenall-js/index.html).

## How to use

There are two options to use kenall-js in your project.  The one is to put a `<script>` tag referring to the script bundle somewhere atop of your HTML file to invoke the API from within your script, and the other is to specify `kenall` package as a dependency in your Node.js project's package.json.

### Usage from within the plain-old JavaScript

> [!NOTE]
> As of v2.0.0, Internet Explorer is no longer supported.

All you need is put a `<script>` tag that refers to the script bundle as follows:

```html
<script type="text/javascript" src="LOCATION-TO-THE-SCRIPT-BUNDLE"></script>
```

This adds a property `kenall` to the global `window` object, from which you can refer to `KENALL` constructor to create the object that works as the interface.  Look at the following example to see what it goes like.

Note that you need to upload the script bundle beforehand somewhere accessible from the browser.

```html
<script type="text/javascript">
function fill(form) {
  // You can obtain the API key from the dashboard at kenall.jp/home
  const k = new kenall.KENALL('API_KEY');
  const postalCode = form.elements["postalcode"].value;
  k.getAddress(postalCode).then(
    function (address) {
      const firstCandidate = address.data[0];
      form.elements["prefecture"].value = firstCandidate["prefecture"];
    }
  ).catch(function () {
    alert("Failed to invoke the API");
  });
}
</script>
```

The script bundle can be downloaded at the release page.

Alternatively, you can use the following URL for the latest bundle.  Beware that we don't provide any warranty on its availability, though we'll put as much effort as possible for keeping it up.

* [https://js.kenall.jp/2026-08-25/kenall.js](https://js.kenall.jp/2026-08-25/kenall.js)

Previous versions:

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

#### Verifying the bundle

Every bundle we publish is listed below with its SHA-384 digest, so that you can confirm the file you downloaded is the one we published:

```
$ curl -s https://js.kenall.jp/2026-08-25/kenall.js | openssl dgst -sha384 -binary | openssl base64 -A
NWNItGymmaDpiPW267sOuu1fjDQrO8DEMJ0RDsxlV5nYDQijSUR+Z/BuYJETxaEh
```

| Bundle | Version | Digest |
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
> The digests are given in the `sha384-BASE64` form that [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) uses, but note that an `integrity` attribute on a `<script>` tag pointing at `js.kenall.jp` will not work yet: validating integrity for a cross-origin subresource requires the response to carry CORS headers, which `js.kenall.jp` does not currently send.  If you need SRI today, host a copy of the bundle yourself after verifying its digest against the table above.

As of v2.7.0 the bundle is also reproducible: the build stamps the commit date rather than the wall clock, so building a tag yourself yields a byte-for-byte identical file and you can check a published bundle against its source.

```
$ git checkout v2.7.0 && npm ci && npm run bundle
$ openssl dgst -sha384 -binary dist/bundle.js | openssl base64 -A
```


### Usage in a Node.js project

`@ken-all/kenall` requires Node.js 20 or later in Node.js environments because
it relies on the native Fetch API.

Run

```
$ npm i @ken-all/kenall
```

to add kenall.js as a dependency for your project.

Then you can use it like the following:

```javascript
const { KENALL } = require('@ken-all/kenall');

// You can obtain the API key from the dashboard at kenall.jp/home
const api = new KENALL('API_KEY');
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

or either in TypeScript,

```typescript
import { KENALL } from '@ken-all/kenall';

const kenall = new KENALL('API_KEY');
const r = await kenall.getAddress(postalCode);
console.log(r);
```

## Building

Run

```
$ npm run build
```

to generate JavaScript scripts under `dist/`.  If you want to get the bundle, run

```
$ npm run bundle
```

and you'll find one under `dist/`.


## Tests

```
$ npm run test
```

## Examples & Demos

* https://ken-all.github.io/kenall-js-demo/
* https://github.com/KEN-ALL/kenall-js/tree/master/examples
