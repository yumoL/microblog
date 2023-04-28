/**
 * @description encapsulate sequalize data types
 */

const Sequalize = require('sequelize')

module.exports = {
  STRING: Sequalize.STRING,
  DECIMAL: Sequalize.DECIMAL,
  TEXT: Sequalize.TEXT,
  INTEGER: Sequalize.INTEGER,
  BOOLEAN: Sequalize.BOOLEAN
}