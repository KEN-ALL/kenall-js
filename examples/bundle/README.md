# Bundle JS example

Although this example uses Vite to render HTMLs with a development server, it doesn't actually try to bundle any JavaScript code.

Set `VITE_KENALL_API_KEY` environment variable to your API key.

```
export VITE_KENALL_API_KEY=<Your kenall API key>
```

And type

```
npm run dev
```

to start the development server on port 9876.

You can try the demo by opening http://127.0.0.1:9876/ in your browser.

Be sure to add 127.0.0.1:9876 to the API key's allowed hosts.