/**
 * @description profile page controller
 */
const xss = require('xss')
const { getBlogListByUser } = require('../services/blog')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../config/constant')

/**
 * get blog list that will be shown in the profile page, i.e., 
 * blogs published by the user whose profile page we are currently in
 * @param {string} userName 
 * @param {string} pageIndex current page
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({ 
    userName, 
    pageIndex, 
    pageSize: PAGE_SIZE
  })
  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}