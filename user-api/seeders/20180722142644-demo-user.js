'use strict'

const bcrypt = require('bcryptjs')

const BCRYPT_STRENGTH = 8

module.exports = {
  up: (queryInterface, Sequelize) => {
    return bcrypt.hash(
      'demo1234',
      BCRYPT_STRENGTH
    ).then(hash => {
      return queryInterface.bulkInsert('users', [{
        email: 'demo@demo.com',
        name: 'demo',
        phone: '082123123123',
        password: hash,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }], {})
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
