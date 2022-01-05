const Sequelize = require("sequelize"),
	moment = require("moment"),
	msqlconfig = require("./config").mssql,
	logger = require("./logger")("[database]"),
	db = {
		mssql: {},
	}

const LOG_MAX_QUERY_LENGTH = 2000

db.mssql = new Sequelize(
	msqlconfig.database,
	msqlconfig.username,
	msqlconfig.password,
	{
		host: msqlconfig.host,
		define: {
			charset: "utf8",
			collate: "utf8_general_cs",
		},
		dialect: "mssql",
		dialectOptions: {
			// Explicitly disable encryption for performance reasons
			encrypt: 0,
			requestTimeout: 5000,
			connectTimeout: 5000,
		},
		// Using Sequelize without any aliases improves security
		operatorsAliases: 0,
		// Logging the SQL string is useful
		logging: (sql, ms) => {
					if (ms > 3000) {
						logger.warn(
							`Sequelize Query *** SLOW! *** (${ms}ms)`,
							sql
						)
					} else {
						if (sql.length > LOG_MAX_QUERY_LENGTH) {
							sql = `${sql.substr(
								0,
								LOG_MAX_QUERY_LENGTH / 2
							)} ... ${sql.substr(
								-LOG_MAX_QUERY_LENGTH / 2,
								LOG_MAX_QUERY_LENGTH / 2
							)} (${sql.length} chars)`
						}
						logger.debug(`Sequelize Query (${ms}ms): ${sql}`)
					}
			  },
		benchmark: 1,
		pool: {
			// Only 1 connection should be used
			max: 100,
			min: 0,
			acquire: 100 ,
			idle: 100,
			evict: 100
		},
		retry: {
			match: [
				Sequelize.ConnectionError,
				Sequelize.ConnectionTimedOutError,
				Sequelize.TimeoutError,
				/deadlocked/i,
			],
			max: 5,
		},
	}
)

// Provide some sane defaults for model definitions
db.mssql.beforeDefine((attr, opts) => {
	Object.keys(attr).forEach(field => {
		// Set type explicitly
		if (attr[field].type === undefined) {
			attr[field] = {
				type: attr[field],
			}
		}
		// set to nullable for ease of use
		attr[field].allowNull = 1

		// Set fields to NOT NULL unless specified otherwise
		if (attr[field].allowNull === undefined) {
			attr[field].allowNull = 0
		}
	})
	// Set default values for timestamps
	if (opts.timestamps !== false) {
		attr.createdAt = attr.createdAt || {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			allowNull: 0,
		}
		attr.updatedAt = attr.updatedAt || {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			allowNull: 0,
		}
	}
})

db.mssql.beforeBulkSync(() => {
	Object.keys(db.mssql.models).forEach(modelName => {
		const fieldsToIndex = new Set()
		const model = db.mssql.models[modelName]
		const attr = model.attributes
		Object.keys(attr).forEach(field => {
			// Add to list of indexed fields
			if (attr[field].references) {
				fieldsToIndex.add(attr[field].field)
			}
		})
		// Set up indexes for any `references` / foreign keys
		const setupIndexes = new Set()
		if (model.options.indexes) {
			model.options.indexes.forEach(idx => {
				if (idx.fields && idx.fields.length > 0) {
					setupIndexes.add(idx.fields[0])
				}
			})
		}
		fieldsToIndex.forEach(field => {
			if (!setupIndexes.has(field)) {
				model.options.indexes.push({
					fields: [field],
				})
			}
		})
	})
})

module.exports = db
