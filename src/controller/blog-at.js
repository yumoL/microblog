/**
 * @description Blog @ relations controller
 */

const { 
  getAtRelationCount, 
  getAtUserBlogList,
  updateAtRelation 
} = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constant')

/**
 * Get the number of blogs where the user is @:ed
 * @param {number} userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * Get blogs where the user is ated
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({ 
    userId, 
    pageIndex, 
    pageSize: PAGE_SIZE 
  })

  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

/**
 * mark blogs as read
 * @param {number} userId 
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation(
      { newIsRead: true},
      { userId, isRead: false}
    )
  } catch (ex) {
    console.error(ex)
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}