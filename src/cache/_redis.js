/**
 * @description connect to redis (get, set)
 */

const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
const redisClient = redis.createClient({
  url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`
})
!(async function () {
  await redisClient.connect()
  if (redisClient.isReady) {
    console.log('Connected to redis')
  } else {
    console.error(`Failed to connect to redis. Host: ${REDIS_CONF.host}, post: ${REDIS_CONF.port}`)
  }
  // .then(() => console.log('Connected to redis'))
  // .catch(console.error(`Failed to connect to redis. Host: ${REDIS_CONF.host}, post: ${REDIS_CONF.port}`))
})()

/**
 * redis set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout second
 */
async function set(key, val, timeout = 60 * 60) {
  let objVal
  if (typeof val === 'object') {
    objVal = JSON.stringify(val)
  } else {
    objVal = val
  }
  await redisClient.set(key, objVal)
  await redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key 
 */
async function get(key) {
  try {
    val = await redisClient.get(key)
    if (val === null) return val
    try {
      val = JSON.parse(val)
      return val
    } catch (err) { }
    return val
  } catch (err) {
    throw err
  }
}

module.exports = {
  set,
  get
}
