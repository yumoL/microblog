/**
 * @description utils API
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async(ctx, next) => {
  const file = ctx.req.files['file'] //corresponding to formData.append('file', file) in my-ajax.js
  if (!file) return
  const { size, path, name, type } = file
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})

module.exports = router