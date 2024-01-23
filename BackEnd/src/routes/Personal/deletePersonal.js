const { Personal } = require('../../db/sequelize')

module.exports = (app) => {
  app.delete('/api/users/:id', (req, res) => {
    Personal.findByPk(req.params.id)
      .then(personal => {
        if (personal === null) {
          const message = 'Personal not found. Try with other id.'
          return res.status(400).json({ message })
        }

        const personalDeleted = personal
        if (!personalDeleted.actif) {
          Personal.destroy({
            where: { id: personal.id }
          })
            .then(_ => {
              const message = `${personalDeleted.matricule} has been deleted.`
              res.json({ message, data: personalDeleted })
            })
            .catch(error => {
              const message = 'Connection error. Please retry after or contact technical service.'
              res.json(500).json({ message, data: error })
            })
        } else if (personalDeleted.actif) {
          Personal.update({ 'actif': 0 }, {
            where: { id: personalDeleted.id }
          })
            .then(_ => {
              return Personal.findByPk(personalDeleted.id)
                .then(
                  personal => {
                    const message = `${personal.matricule} has been moved to inactive.`
                    res.json({ message, data: personal })
                  })
                .catch(error => {
                  const message = 'Connection error. Please retry after or contact technical service.'
                  res.json(500).json({ message, data: error })
                })
            })
        }
      })
  })
}