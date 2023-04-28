/**
 * @description format data retrieved from db
 */

const { DEFAULT_PICTURE } = require('../config/constant')

/**
 * format user avatar
 * @param {Object} obj user object
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * format user info
 * @param {Array|Object} list user list or a single user object
 */
function formatUser(list) {
  if (list == null) return list

  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}