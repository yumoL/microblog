/**
 * @description functions for setting up and tearing down unit tests
 */

const server = require('./server')
const { testUser } = require('./testUserInfo')


async function register(user) {
  const res = await server
    .post('/api/user/register')
    .send(user)
  return res
}

async function login(userName, password) {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  return res
}

async function registerAndLogin() {
  await register(testUser)
  const res = await login(testUser.userName, testUser.password)
  const COOKIE = res.headers['set-cookie'].join(";")
  return COOKIE
}

module.exports = {
  register,
  login,
  registerAndLogin
}