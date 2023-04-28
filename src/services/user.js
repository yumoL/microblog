/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * get user information
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (result == null) return result

  // format
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

module.exports = {
  getUserInfo
}