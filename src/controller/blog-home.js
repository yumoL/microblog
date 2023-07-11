/**
 * @description home page controller
 */
const xss = require('xss')
const { createBlog, getFolloweeBlogList } = require('../services/blog')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  createBlogFailInfo
}
  = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../config/constant')

/**
 * create a blog
 * @param {Object} param0 data for creating a blog {userId, content, image}
 */
async function create({ userId, content, image }) {
  // check @ in blog content, e.g., "hello @lisi-lisihaha @wangwu-wangwu999"
  const atuserNameList = []
  const reg = /@(.+?)-(\w+?)\b/g
  content = content.replace(
    reg,
    (matchStr, nickName, userName) => {
      // replace nothing but just get username from @ in content
      atuserNameList.push(userName)
      return matchStr
    }
  )

  // get @ user ids from usernames
  const atUserList = await Promise.all(
    atuserNameList.map(userName => getUserInfo(userName))
  )
  const atUserIdList = atUserList.map(user => user.id)

  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    // create @ relations
    await Promise.all(atUserIdList.map(
      userId => createAtRelation(blog.id, userId)
    ))

    return new SuccessModel(blog)

  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * Get blog list (mine and my followee's) for home page
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFolloweeBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList
}