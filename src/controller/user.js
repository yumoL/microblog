/**
 * @description user controller (business logic)
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { regisrerUserNameNotExistInfo } = require('../model/ErrorInfo')

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
    return new ErrorModel(regisrerUserNameNotExistInfo)

  }

}

module.exports = {
  isExist
}