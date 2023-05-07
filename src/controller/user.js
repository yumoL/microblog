/**
 * @description user controller (business logic)
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
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

/**
 * 
 * @param {Object} ctx 
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture avatar url
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * change password
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName, password, newPassword) {
  const result = updateUser(
    { newPassword: doCrypto(newPassword) },
    {
      userName,
      password: doCrypto(password)
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword
}