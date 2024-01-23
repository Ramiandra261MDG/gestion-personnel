const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Personal } = require('../../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post('/api/users', (req, res) => {
    // Hasher le matricule avec bcrypt
    bcrypt.hash(req.body.code_acces, 10)
      .then(hashedCodeAccess => {
        // Créer l'objet Personal avec le matricule hashé
        const personalData = { ...req.body, code_acces: hashedCodeAccess }

        // Ajouter le Personal à la base de données
        return Personal.create(personalData)
      })
      .then(personal => {
        const message = `${req.body.matricule} has been added successfully.`
        res.json({ message, data: personal })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = 'Connection error. Please retry after or contact technical service.'
        res.status(500).json({ message, data: error })
      })
  })
}