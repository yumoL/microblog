/**
 * @description middlewares that check whether a user has already logged in
 */
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * login check for API
 * @param {Object} ctx
 * @param {function} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * login check for UI
 * @param {Object} ctx
 * @param {function} next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  const curUrl = ctx.url 
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))

}

module.exports = {
  loginCheck,
  loginRedirect
}