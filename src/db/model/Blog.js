/**
 * @description Blog model
 */

const seq = require('../seq')
const { STRING, INTEGER, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  content: {
    type: TEXT,
    allowNull: false
  },
  image: {
    type: STRING,
    allowNull: true
  }
})

module.exports = Blog