/**
 * @description API for personal zone 
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListHtmlStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')

router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)

  //render to html
  result.data.blogListTpl = getBlogListHtmlStr(result.data.blogList)

  ctx.body = result
})

router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await follow(myUserId, curUserId)
})

router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router