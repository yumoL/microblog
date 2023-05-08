const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./config/db')
const { SESSION_SECRET_KEY } = require('./config/secretKeys')
const { isProd } = require('./utils/env')
 
const utilsApiRouter = require('./routes/apis/utils')
const userViewRouter = require('./routes/views/user')
const userApiRouter = require('./routes/apis/user')
const blogViewRouter = require('./routes/views/blog')
const homeApiRouter = require('./routes/apis/blog-home')
const errorViewRouter = require('./routes/views/error')

// error handler
let onErrorConf = {}
if (!isProd) {
  onErrorConf = {
    redirect: '/error'
  }
}

onerror(app, onErrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadedFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session config
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', //cookie key in the http header
  prefix: 'weibo:sess:', //prefix of the redis key, e.g., weibo:sess:(cookie key e.g., ZkrNvEYY9bmUg0LHj00pyN_1XZsxN6LX)
  cookie: {
    path: '/', //cookie can be used in all APIs of the server
    httpOnly: true, //cookie can only be changed in the server
    maxAge: 24 * 60 * 60 * 1000 //expiration time (ms)
  },
  //ttl of redis key is defaulted to maxAge
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
//use of allowedMethods https://juejin.cn/post/7042183318854434852
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //error routes need to be the final one

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
