const { Personal } = require('../../db/sequelize')

module.exports = (app) => {
  app.get('/api/users/:id', (req, res) => {
    Personal.findByPk(req.params.id)
      .then(personal => {
        if (personal === null) {
          const message = 'Personal not found. Try with other id.'
          return res.status(400).json({ message })
        }
        const message = 'The user was found.'
        res.json({ message, data: personal })
      })
      .catch(error => {
        const message = 'Connection error. Please retry after or contact technical service.'
        res.json(500).json({ message, data: error })
      })
  })
}