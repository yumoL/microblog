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

module.exports = {
  createAtRelation
}