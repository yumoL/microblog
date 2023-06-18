const seq = require('../seq')
const { INTEGER } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  followeeId: {
    type: INTEGER,
    allowNull: false,
    comment: 'the person followed by the user'
  }
})

module.exports = UserRelation