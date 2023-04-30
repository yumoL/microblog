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

/**
 * create a new user
 * @param {string} userName 
 * @param {string} password
 * @param {number} gender (1=man, 2=woman, 3=other)
 * @param {string} nickName
 */
async function createUser({ userName, password, gender=3, nickName }) {
  const result = User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
}

/**
 * delete a user
 * @param {string} userName 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result is the number of deleted rows
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}