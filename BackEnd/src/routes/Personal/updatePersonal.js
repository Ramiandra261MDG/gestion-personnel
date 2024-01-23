const { Personal } = require('../../db/sequelize')

module.exports = (app) => {
  app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    Personal.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        return Personal.findByPk(id)
          .then(
            personal => {
              if (personal === null) {
                const message = 'Personal not found. Try with other id.'
                return res.status(400).json({ message })
              }
              const message = `${personal.matricule} has been modified.`
              res.json({ message, data: personal })
            })
          .catch(error => {
            const message = 'Connection error. Please retry after or contact technical service.'
            res.json(500).json({ message, data: error })
          })
      })
  })
}