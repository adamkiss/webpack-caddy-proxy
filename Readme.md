# webpack-caddy-proxy

> Start/stop Caddy Server together with your Webpack watcher

## Usage

```javascript
const WebpackCaddyProxy = require('webpack-caddy-proxy')
const caddyProxy = new WebpackCaddyProxy({
    https: true,
    port: 2222,
    caddyfile: `${__dirname}/custom/Caddyfile`
})

const config = {
    // ...
    plugins: [
        caddyProxy
    ],
    browserSync: caddyProxy.browserSyncProxy()
}
```

Made for my particular usecase, this plugin starts the first time Webpack watcher runs, and binds the Caddy process to the watcher, so when you kill it, Caddy is killed as well.

Additionally, once setup, it autosets port for Caddy and Browser Sync (the one given in the options is the Browser Sync), and returns browserSync configuration object. In a very dumb way.

## Author & License

&copy; 2018 [Adam Kiss](https://adamkiss.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

