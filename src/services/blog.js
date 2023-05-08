/**
 * @description blog service
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}