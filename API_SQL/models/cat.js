const Sequelize = require("sequelize"),
	database = require("../database"),
	idField = require("../idField")

// Lookup table for campaign lot (see fields/campaignLotWindow)
const Cat = database.mssql.define(
	"cat",
	{
		...idField,
		Breed: {
			type: Sequelize.STRING,
		},
        LocationOfOrigin: {
			type: Sequelize.STRING,
		},
        Type: {
			type: Sequelize.STRING,
		},
        BodyType: {
			type: Sequelize.STRING,
		},
        CoatTypeAndLength: {
			type: Sequelize.STRING,
		},
        CoatPattern: {
			type: Sequelize.STRING,
		},
	},
	{
		schema: "dbo",
		tableName: "cats",
	}
)

module.exports = Cat
