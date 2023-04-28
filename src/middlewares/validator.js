/**
 * @description a middleware for validating data using json schema
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFailInfo } = require('../model/ErrorInfo')

/**
 * generate a a middleware for validating data using json schema
 * @param {object} validateFn the real validation function
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // validation fails
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }
    // validation ok, continue
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}