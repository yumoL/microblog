/**
 * @description json schema validation
 */

const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * validate data using json schema
 * @param {Object} schema validation rules(json schema)
 * @param {Object} data data to be validated
 */
function validate(schema, data={}) {
  const validate = ajv.compile(schema)
  const valid = validate(data)
  if (!valid) {
    return validate.errors[0]
  }
} 

module.exports = validate