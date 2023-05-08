/**
 * @description home page controller
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  createBlogFailInfo
}
  = require('../model/ErrorInfo')
  
/**
 * create a blog
 * @param {Object} param0 data for creating a blog {userId, content, image}
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)

  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}