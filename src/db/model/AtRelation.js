/**
 * At relation model that stores who at whom in a blog
 */
const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  blogId: {
    type: INTEGER,
    allowNull: false
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = AtRelation