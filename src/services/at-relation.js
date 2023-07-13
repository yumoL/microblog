/**
 * @description @ relation service
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

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

/**
 * Get blogs where the user is ated
 * @param {object} param0 query constraints { userId, pageIndex=0, pageSize=PAGE_SIZE }
 */
async function getAtUserBlogList({ userId, pageIndex = 0, pageSize }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}