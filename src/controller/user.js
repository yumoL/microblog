/**
 * @description user controller (business logic)
 */

const { getUserInfo, createUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
}
  = require('../model/ErrorInfo')
const doCrypto = require('../utils/encrypt')

/**
 * check if th username is already existing
 * @param {string} userName
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // {errno: 0, data: {...}}
    return new SuccessModel(userInfo)

  } else {
    // {errno: xxx, message: xxx}
    return new ErrorModel(registerUserNameNotExistInfo)

  }
}

/**
 * register a new user
 * @param {string} userName 
 * @param {string} password
 * @param {number} gender (1=man, 2=woman, 3=other)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // username already exists
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }

}

/**
 * Log in a user
 * @param {*} ctx koa2 ctx
 * @param {*} userName 
 * @param {*} password 
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * delete the current user who logs in, i.e., who has a session
 * @param {string} userName 
 */
async function deleteCurUser(userName) {
  const res = await deleteUser(userName)
  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}