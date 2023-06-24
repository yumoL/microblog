/**
 * @description API for the home page
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListHtmlStr } = require('../../utils/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
  console.log(ctx.body)
})

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)

  //render to html
  result.data.blogListTpl = getBlogListHtmlStr(result.data.blogList)

  ctx.body = result
})

module.exports = router