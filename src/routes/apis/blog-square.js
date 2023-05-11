/**
 * @description API for public square
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListHtmlStr } = require('../../utils/blog')

router.prefix('/api/square')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)

  //render to html
  result.data.blogListTpl = getBlogListHtmlStr(result.data.blogList)

  ctx.body = result
})

module.exports = router