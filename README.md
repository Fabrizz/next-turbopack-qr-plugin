# next-turbopack-qr-plugin

Prints a QR code in the terminal when you run `next dev` so you can open the local server on your phone.

## Install

```bash
npm install next-turbopack-qr-plugin
```

## Usage

```ts
// next.config.ts
import { withLocalQR } from "next-turbopack-qr-plugin";

export default withLocalQR({
  // ...your config
});
```

## Options

```ts
withLocalQR(nextConfig, {
  port: 3000,   // default: process.env.PORT or 3000
  silent: true, // disable output
})
```

## License

MIT

<br/>

<img alt="Fabrizz logo" src="./.github/logo.png" width="92"><br/>

#

[<img alt="Fabrizz logo" src="./.github/fabriz.png" width="92" align="right">](https://fabriz.co)
<p align="left">Made with 💛 by Fabrizz</p>