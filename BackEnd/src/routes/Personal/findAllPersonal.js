const { Op } = require('sequelize')
const { Personal } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/users', auth, (req, res) => {
    const page = req.query.page || 1;
    const limit = 5; // Nombre d'utilisateurs par page
    const offset = (page - 1) * limit;

    if (req.query.name) {
      const name = req.query.name
      if (name.length <= 1) {
        const message = "You need to tap 2 letters or biggest."
        return res.status(400).json({ message })
      }

      return Personal.findAndCountAll({
        where: {
          nom: { //nom est la propriété du modèlre pokémon
            [Op.like]: `%${name}%` //name est critère de recherche
          }
        }
      })
        .then(({ count, rows }) => {
          const message = `${count} result(s) found.`
          res.json({ message, data: rows })
        })
    } else {
      Personal.findAndCountAll({
        limit,
        offset,
      })
        .then(({ count, rows }) => {
          const message = `${count} user(s) found.`
          const totalPages = Math.ceil(count / limit);
          let page_next
          if (page === totalPages) {
            page_next = null
          } else {
            page_next = parseInt(page) + 1
          }

          let page_prev
          if (page === 1) {
            page_prev = null
          } else {
            page_prev = parseInt(page) - 1
          }
          const pageT = { 'total_page': totalPages, 'page_actual': parseInt(page), 'page_next': page_next, 'page_prev': page_prev, }

          res.json({ message, data: rows, page: pageT, count })
        })
        .catch(error => {
          const message = 'Connection error. Please retry after or contact technical service.'
          res.status(500).json({ message, data: error })
        })
    }
  })
}