const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = 3000

app
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(cors())

sequelize.initDb()

app.get('/', (req, res) => {
    res.send('Hello World')
})

/*  */
require('./src/routes/Personal/findAllPersonal')(app)
require('./src/routes/Personal/findPersonalById')(app)
require('./src/routes/Personal/createPersonal')(app)
require('./src/routes/Personal/updatePersonal')(app)
require('./src/routes/Personal/activatePersonal')(app)
require('./src/routes/Personal/deletePersonal')(app)

require('./src/routes/Auth/login')(app)
/*  */
app.use((req, res, next) => {
    const message = 'Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.'
    res.status(404).json({ message })
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
