const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/config')
const PersonalModel = require('../models/personal')

const sequelize = new Sequelize(config.DB_DBNAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql'
})

const Personal = PersonalModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync()
    .then(_ => {
      console.log("INIT DB")
      console.log('Database connected')
    })
    .catch((err) => {
      console.error('Erreur')
    })
}

module.exports = {
  initDb, Personal
}