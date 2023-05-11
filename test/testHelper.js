/**
 * @description functions for setting up and tearing down unit tests
 */

const server = require('./server')
const { testUser } = require('./testUserInfo')
const { Blog, User } = require('../src/db/model/index')
 

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

async function addBlogs() {
  const blogList = [
    {
      content: 'aa',
      image: '/img1.jpg'
    },
    {
      content: 'bb'
    }
  ]
  blogList.forEach(async blog => 
    await server
    .post('/api/blog/create')
    .send(blog)
    )
}

async function destroyAll() {
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })
}

module.exports = {
  register,
  login,
  registerAndLogin,
  addBlogs,
  destroyAll
}