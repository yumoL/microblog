/**
 * user relation service
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format.js')
const Sequelize = require('sequelize')

/**
 * get users who are following the person with followeeId
 * @param {number} followeeId user id of the person who is followed
 */
async function getUsersByFollowee(followeeId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followeeId,
          userId: {
            [Sequelize.Op.ne]: followeeId
          }
        }
      }
    ]
  })
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

/**
 * get users the userId follows
 * @param {number} userId 
 */
async function getFolloweesByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followeeId: {
        [Sequelize.Op.ne]: userId
      }
    }
  })
  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    return user
  })
  return {
    count: result.count,
    userList
  }
}

/**
 * Add a following relation
 * @param {number} userId 
 * @param {number} followeeId user who is followed by userId
 */
async function addFollowingRelation(userId, followeeId) {
  const result = await UserRelation.create({
    userId,
    followeeId
  })
  return result.dataValues
}

/**
 * Delete a following relation
 * @param {number} userId 
 * @param {number} followeeId user that userId wants to unfollow
 */
async function deleteFollowingRelation(userId, followeeId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followeeId
    }

  })
  return result
}

module.exports = {
  getUsersByFollowee,
  getFolloweesByUser,
  addFollowingRelation,
  deleteFollowingRelation
}