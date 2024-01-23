/* Authentification : Créer un modèle User avec Sequelize */
const jwt = require('jsonwebtoken')
const privateKey = require('./private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        const message = `JWT is missing.`
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if (error) {
            const message = `User restricted.`
            return res.status(401).json({ message, data: error })
        }

        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            const message = `ID is not valid.`
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}