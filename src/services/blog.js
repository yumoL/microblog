/**
 * @description blog service
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * save a blog
 * @param {Object} param0 data for creating a blog { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

/**
 * get blogs by user
 * @param {Object} query parameters { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }

}

module.exports = {
  createBlog,
  getBlogListByUser
}