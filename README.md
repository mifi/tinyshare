# tinyshare

tinyshare is a tiny TypeScript-first helper for building social sharing URLs and opening share windows. It's a small, typed fork of the popular [Sharer.js](https://github.com/ellisonleao/sharer.js) project by Ellison Leao.

## Why `tinyshare`?

- TypeScript-first: sharer options are typed per-service so incorrect options are caught at compile time.
- Tiny: single-file module with no runtime dependencies.
- Can be used with any UI library (e.g. Vue, React, or plain vanilla JS) because it only handles the sharing part (as opposed to Sharer.js which also bind to HTML elements)
- Compatible: preserves the original sharing logic and URL formats from Sharer.js.

## Usage

```ts
import share from 'tinyshare'

// share(url, sharerName, options)
share('https://example.com', 'twitter', { title: 'Hello', hashtags: 'news' })
```
