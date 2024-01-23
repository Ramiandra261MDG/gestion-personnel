/* Authentification : Créer un modèle User avec Sequelize */
const { Personal } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        Personal.findOne({ where: { matricule: req.body.matricule } }).then(user => {

            if (!user) {
                const message = `User not found.`
                return res.status(404).json({ status: false, message })
            }

            bcrypt.compare(req.body.code_acces, user.code_acces).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Password incorrect.`
                    return res.status(401).json({ status: false, message })
                }

                // JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                )

                const message = `User connected successfully`
                return res.json({ status: true, message, data: user, token })
            })
        })
            .catch(error => {
                const message = 'Connection error. Please retry after or contact technical service.'
                return res.status(500).json({ status: false, message, data: error })
            })
    })
}