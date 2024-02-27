const { Sequelize } = require('sequelize')
const { DATABASE, USERNAME, PASSWORD } = require('./constants')

module.exports = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  timezone: '-04:00',
})