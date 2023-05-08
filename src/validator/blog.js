/**
 * @description blog forma validator
 */

const validate = require('./_validate')

const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * perform blog data validation
 * @param {Object} data blog data
 * @returns 
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate