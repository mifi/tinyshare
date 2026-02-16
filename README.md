# tinyshare

tinyshare is a tiny TypeScript-first helper for building social sharing URLs and opening share windows. It's a small, typed fork of the popular [Sharer.js](https://github.com/ellisonleao/sharer.js) project by Ellison Leao.

## Why tinyshare?

- TypeScript-first: sharer options are typed per-service so incorrect options are caught at compile time.
- Tiny: single-file module with no runtime dependencies.
- Can be used with any UI library (e.g. Vue, React, or plain vanilla JS) because it only handles the sharing part (as opposed to Sharer.js which also bind to HTML elements)
- The alternatives I found don't expose an API to open a share window programmatically - they are tightly coupled to the buttons / UI
- Compatible: preserves the original sharing logic and URL formats from Sharer.js.

## Usage

Simple usage:

```ts
import share from 'tinyshare'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// share(url, sharerName, options)
share('https://example.com', 'twitter', { title: 'Hello', hashtags: 'news' })

// Advanced options:
share('https://example.com', 'facebook', {
  title: 'Hello',
  hashtags: '#news',
  popup: { width: 300, height: 300 },
  onWindowClose: () => console.log('Share window closed'),
})
```

Use your own icons / UI design:

```ts
import share from 'tinyshare'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const url = 'https://example.com'

function SocialShare() {
  return (
    <div style={{ display: 'flex', gap: '1em }}>
      <FaFacebook role="button" tabIndex={0} onClick={() => share(url, 'facebook', { hashtag: `#news` }) } />
      <FaTwitter role="button" tabIndex={0} onClick={() => share(url, 'facebook', { title: 'Hello', hashtags: 'news' }) } />
      <FaWhatsapp role="button" tabIndex={0} onClick={() => share(url, 'facebook', { title: 'Hello' }) } />
    </div>
  )
}
```

## Publishing

```bash
np
```

## Related

- https://github.com/ellisonleao/sharer.js
- https://www.npmjs.com/package/react-social-icons
