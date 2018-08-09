const config = require('../helpers/database')
const database = config.database

const User = database.define('users', {
  email: {
    type      : config.string,
    isUnique  : true,
    allowNull : false,
    validate  : {
      isEmail : {
        args: true,
        msg: 'Email format not correct'
      }
    }
  },
  name: {
    type      : config.string,
    allowNull : false
  },
  phone: {
    type      : config.string,
    isUnique  : true,
    allowNull : false,
    validate  : {
      isNumeric: {
        args: true,
        msg: 'Phone must be numeric'
      },
      len: {
        args: [8, 12],
        msg: 'Phone number between 8-12 number'
      }
    }
  },
  password: {
    type      : config.string,
    allowNull : false,
    validate  : {
      len: {
        args: 8,
        msg: 'Password at least 8 character'
      },
      // is: {
      //   args: /^[a-zA-Z0-9]+$/i,
      //   msg: 'Password must containt number and alphabet'
      // }
    }
  },
}, {})

module.exports = User
