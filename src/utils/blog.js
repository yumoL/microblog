/**
 * @description render blog data to html
 */

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * render html string for a blog list
 * @param {Array} blogList 
 * @param {boolean} canReply 
 * @returns 
 */
function getBlogListHtmlStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListHtmlStr
}