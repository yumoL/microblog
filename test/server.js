/**
 * @description server used in test
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)