/**
 * @description encryption
 */

const crypto = require('crypto')

const { CRYPTO_SECRET_KEY } = require('../config/secretKeys')

/**
 * encrypt using md5
 * @param {string} content plain text
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * encrypt
 * @param {string} content plain text 
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto