const { Personal } = require('../../db/sequelize')

module.exports = (app) => {
  app.put('/api/users/activate/:id', (req, res) => {
    Personal.findByPk(req.params.id)
      .then(personal => {
        if (personal === null) {
          const message = 'Personal not found. Try with other id.'
          return res.status(400).json({ message })
        }

        const personalToActivate = personal
        if (!personalToActivate.actif) {
          Personal.update({ 'actif': 1 }, {
            where: { id: personalToActivate.id }
          })
            .then(_ => {
              return Personal.findByPk(personalToActivate.id)
                .then(
                  personal => {
                    const message = `${personal.matricule} has been activated.`
                    res.json({ message, data: personal })
                  })
                .catch(error => {
                  const message = 'Connection error. Please retry after or contact technical service.'
                  res.json(500).json({ message, data: error })
                })
            })
        } else {
          Personal.findByPk(personalToActivate.id)
            .then(
              personal => {
                const message = `${personal.matricule} is already activate.`
                res.json({ message, data: personal })
              }
            )
            .catch(error => {
              const message = 'Connection error. Please retry after or contact technical service.'
              res.json(500).json({ message, data: error })
            })
        }
      })
  })
}