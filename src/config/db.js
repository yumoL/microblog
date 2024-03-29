/**
 * @description redis configuration
 */

const { isProd, isTest } = require('../utils/env')

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
    host: 'redis' //'127.0.0.1'
  }

  MYSQL_CONF = {
    host: 'mysql', //'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'koa2_weibo_prd_db'
  }
} else if (isTest) {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'koa2_weibo_test_db'
  }
}


module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}