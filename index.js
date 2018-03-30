const { resolve } = require('path')
const { spawn } = require('child_process')

module.exports = class WebpackCaddyProxy {
	constructor(opts) {
		this.opts = Object.assign({
			port: 2222,
			https: true,
			caddyfile: resolve(__dirname, 'Caddyfile')
		}, opts)

		this.apply = this.apply.bind(this)
		this.start = this.start.bind(this)
		this.kill = this.kill.bind(this)
		this.browserSyncProxy = this.browserSyncProxy.bind(this)
	}

	apply(compiler) {
		compiler.plugin('watch-run', (compiler, done) => {
			if (!this.caddyIsRunning) {
				this.process = process
				this.process.on('SIGINT', this.kill)
				this.start()
			}
			done()
		})
	}

	start() {
		this.caddy = spawn(
			'caddy', [
				'-port', this.opts.port - 1,
				'-conf', this.opts.caddyfile,
			], { stdio: 'inherit' }
		)
		this.caddy.on('close', (code, signal) => {
			console.log(`${signal}: Caddy Server ended with code ${code}`)
		})
		this.caddyIsRunning = true
	}

	kill() {
		if (this.caddyIsRunning) {
			this.caddy.kill()
		}
		process.exit()
	}

	browserSyncProxy() {
		return {
			server: false,
			https: this.opts.https,
			port: this.opts.port,
			proxy: `http${this.opts.https ? 's' : ''}://localhost:${this.opts.port - 1}`,
			notify: true
		}
	}
}
