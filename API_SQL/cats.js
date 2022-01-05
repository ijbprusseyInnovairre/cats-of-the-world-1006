const express = require('express'),
Cat = require("./models/cat"),
jwt = require('jsonwebtoken'),
app = express(),
database = require("./database"),
config = require("./config"),
logger = require("./logger")("[database]");

const accessTokenSecret = config.accessTokenSecret;

app.use(express.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.get('/cats', authenticateJWT, async (req, res) => {
    res.send(await Cat.findAll({
		raw: true,
		attributes: { exclude: ["createdAt", "updatedAt"] },
		order: ["Breed"],
	}))
});

app.post('/cats', authenticateJWT, async (req, res) => {
    const {
        role
    } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const cat = req.body;

    res.send(await Cat.create(cat));
});


app.delete('/cats/:id', authenticateJWT, async (req, res) => {
    const {
        role
    } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    // Determine item ID
	const id = parseInt(req.params.id, 10)
	if (Number.isNaN(id)) {
		throw new Error(`[400] Invalid row ID: ${id}`)
	}
    await Cat.destroy({
        where: { id }
    })
    
    res.send('cat removed successfully');
  })

app.listen(config.catserver.port, () => {
    console.log(`CatsOfTheWorld service started on port ${config.catserver.port}`);
});

database.mssql
	.authenticate()
	.then(() => {
		logger.info(
			`Connection to mssql ${database.mssql.config.database} successfully established on ${database.mssql.config.host}`
		)
	})
	.catch(e => {
		logger.error(
			`Failed to connect to mssql ${database.mssql.config.database} on ${database.mssql.config.host}. Error: ${e.message}`,
		)
	})