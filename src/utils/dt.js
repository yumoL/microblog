/**
 * @description formate datetime
 */

const { format } = require('date-fns')

/**
 * format time, e.g., 12.01 13:35
 * @param {string} str time string
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:MM')
}

module.exports = { 
  timeFormat
}