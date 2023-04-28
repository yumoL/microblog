/**
 * @description User model
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickName: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '1=man, 2=woman, 3=other'
  },
  picture: {
    type: STRING,
    comment: 'url of avatar'
  },
  city: {
    type: STRING
  }
})

module.exports = User

