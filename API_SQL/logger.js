const { createLogger, format, transports } = require("winston"),
	{ combine, timestamp, colorize, json, printf } = format,
	config = require("./config"),
	DbTransport = require("./dbTransport")

const logFormatter = printf(
	info =>
		`${info.timestamp} ${info.level}: ${info.prefix} ${info.stackTrace ||
			info.message.toString()}`
)

const exclusions = process.env.logNot
	? process.env.logNot.split(",").map(nom => `[${nom}]`)
	: []

class Logger {
	constructor(prefix) {
		this.prefix = prefix
		this.logger = createLogger({
			level: config.logLevel || "error",
			transports: [
				new transports.Console({
					format: combine(
						timestamp(),
						json(),
						colorize(),
						logFormatter
					),
				}),
				new DbTransport(),
			],
		})
	}

	write(
		level,
		stackTrace,
		endpoint,
		ipAddress,
		userId,
		pageName,
		dataItemID,
		...args
	) {
		const message = args.join(" ")
		if (!exclusions.includes(this.prefix)) {
			this.logger.log({
				level,
				prefix: this.prefix,
				message,
				stackTrace,
				endpoint,
				ipAddress,
				userId,
				pageName,
				dataItemID,
			})
		}
	}

	debug(...args) {
		this.write("debug", null, null, null, null, null, null, ...args)
	}

	info(...args) {
		this.write("info", null, null, null, null, null, null, ...args)
	}

	warn(...args) {
		this.write("warn", null, null, null, null, null, null, ...args)
	}

	error(stackTrace, endpoint, ipAddress, ...args) {
		if (
			stackTrace &&
			stackTrace.message &&
			!endpoint &&
			!ipAddress &&
			args.length === 0
		) {
			this.write(
				"error",
				null,
				null,
				null,
				null,
				null,
				null,
				stackTrace.message
			)
			return
		}
		this.write(
			"error",
			stackTrace,
			endpoint,
			ipAddress,
			null,
			null,
			null,
			...args
		)
	}

	change(method, userId, path, pageName, change) {
		const endpoint = path
		const stack = method

		const { section, body } = change
		if (body && section && body[section]) {
			const tableChange = body[section]
			const adds = tableChange.add
			const updates = tableChange.update
			const removes = tableChange.remove
			if (
				Object.keys(tableChange).length === 3 &&
				adds &&
				updates &&
				removes
			) {
				delete change.body[section]
			}
		}

		this.write(
			"info",
			stack,
			endpoint,
			null,
			userId,
			pageName,
			change.id,
			JSON.stringify({ change })
		)
	}
}

module.exports = prefix => new Logger(prefix)

const myLogger = new Logger("[logger]")
// Log current log level
setImmediate(() => {
	if (config.logLevel) {
		myLogger.debug(`Current log level is ${config.logLevel}`)
	} else {
		myLogger.info("No log level set; using default log level 'error'")
	}
})

// Handle uncaught exceptions and unhandled Promise rejections
process.on("uncaughtException", err => {
	myLogger.error(null, null, null, "UNCAUGHT EXCEPTION", err)
	setTimeout(() => process.exit(1), 1000)
})
process.on("unhandledRejection", reason => {
	myLogger.error(null, null, null, "UNHANDLED REJECTION", reason)
	setTimeout(() => process.exit(1), 1000)
})
