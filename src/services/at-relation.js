/**
 * @description @ relation service
 */

const { AtRelation } = require('../db/model/index')

/**
 * Create a @ relation between users
 * @param {number} blogId
 * @param {number} userId, user who is @:ed in the blog
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 * Get the number of blogs where the user is @:ed
 * @param {number} userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

module.exports = {
  createAtRelation,
  getAtRelationCount
}