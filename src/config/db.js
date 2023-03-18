/**
 * @description redis configuration
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'koa2_weibo_db'
}

//redis and mysql conf in prod
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}