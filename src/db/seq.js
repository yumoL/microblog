/**
 * @description sequelize description
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host: host,
  dialect: 'mysql'
}

// don't print sql queries when in testing env (defaulted to console.log)
if(isTest) {
  conf.logging = () => {}
}

// in prod env
if (isProd) {
  conf.pool = {
    max: 5, //连接池中最大的连接数量
    min: 0,
    idle: 10000 //一个连接10s之内没有被使用就释放
  }
}


const seq = new Sequelize(database, user, password, conf)

module.exports = seq