// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
const Transport = require("winston-transport")

module.exports = class DbTransport extends Transport {
	log(info, cb) {
		// Ignore empty `info`; don't write debug level info
		if (!info || info.level === "debug") {
			cb()
			return
		}
	}
}
