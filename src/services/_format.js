/**
 * @description format data retrieved from db
 */

const { DEFAULT_PICTURE } = require('../config/constant')
const { timeFormat } = require('../utils/dt')

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

/**
 * format database timestamp
 * @param {Object} obj an object obtained from DB
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * format blog info
 * @param {Array|Object} list blog list or a single blog object
 */
function formatBlog(list) {
  if (list == null) return 
  if (list instanceof Array) {
    return list.map(_formatDBTime)
  }

  return _formatDBTime(list)
}

module.exports = {
  formatUser,
  formatBlog
}