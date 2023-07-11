/**
 * @description Blog @ relations controller
 */

const { getAtRelationCount } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * Get the number of blogs where the user is @:ed
 * @param {number} userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

module.exports = { 
  getAtMeCount
}