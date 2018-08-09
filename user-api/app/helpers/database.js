// Database configuration file

const Sequelize = require('sequelize')

const database = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432
  }
)

module.exports = {
  database,
  string: Sequelize.STRING,
  integer: Sequelize.INTEGER,
  date: Sequelize.DATE
}
