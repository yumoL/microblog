/**
 * user relation service
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format.js')

/**
 * get users who are following the person with followerId
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
          followeeId
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

module.exports = {
  getUsersByFollowee
}