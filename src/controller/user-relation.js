/**
 * @description user relation controller
 */

const { getUsersByFollowee } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * get followers of the user with the given userId
 * @param {number} userId
 */
async function getFans(userId) {
  const { count, userList } = await getUsersByFollowee(userId)
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}