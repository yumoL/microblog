/**
 * @description user relation controller
 */

const { getUsersByFollowee,
  getFolloweesByUser,
  addFollowingRelation,
  deleteFollowingRelation
} = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowingFailInfo,
  deleteFollowingFailInfo
} = require('../model/ErrorInfo')

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

/**
 * get users followed by userId
 * @param {number} userId
 */
async function getFollowees(userId) {
  const { count, userList } = await getFolloweesByUser(userId)
  return new SuccessModel({
    count,
    followeesList: userList
  })
}

/**
 * follow a user
 * @param {number} myUserId user who has logged in
 * @param {number} curUserId user the logged-in user wants to follow
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollowingRelation(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    return new ErrorModel(addFollowingFailInfo)
  }
}

/**
 * Unfollow a user
 * @param {number} myUserId user who has logged in
 * @param {number} curUserId user the logged-in user wants to unfollow
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollowingRelation(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowingFailInfo)

}

module.exports = {
  getFans,
  getFollowees,
  follow,
  unFollow
}