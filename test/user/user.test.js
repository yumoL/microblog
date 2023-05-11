/**
 * @description test user api
 */


const server = require('../server')
const { register, login, registerAndLogin } = require('../testHelper')
const { User, Blog } = require('../../src/db/model/index')
const { testUser } = require('../testUserInfo')


describe('Register', () => {
  let res
  beforeEach(async () => {
    await Blog.destroy({ where: {} })
    await User.destroy({ where: {} })
    res = await register(testUser)
  })

  test('Can register a new user', async () => {
    expect(res.body.errno).toBe(0)
  })

  test('Cannot register a user with duplicated username', async () => {
    const res = await register(testUser)
    expect(res.body.errno).not.toBe(0)
  })

  test('Can check if a username is existing', async () => {
    const res = await server
      .post('/api/user/isExist')
      .send({ userName: testUser.userName })
    expect(res.body.errno).toBe(0)
  })

  test('Invalidated user info should not be registered', async () => {
    const res = await server
      .post('/api/user/register')
      .send({
        userName: '111',
        password: 'a',
        gender: 'male'
      })
    expect(res.body.errno).not.toBe(0)
  })

})

describe('Login', () => {
  beforeEach(async () => {
    await Blog.destroy({ where: {} })
    await User.destroy({ where: {} })
    res = await register(testUser)
  })

  test('Can log in with correct username and password', async () => {
    const res = await login(testUser.userName, testUser.password)
    expect(res.body.errno).toBe(0)
  })
})

describe('Can change user setting after loggin in', () => {
  let COOKIE = ''

  beforeEach(async () => {
    await Blog.destroy({ where: {} })
    await User.destroy({ where: {} })
    COOKIE = await registerAndLogin()
  })

  test('Can change user info', async () => {
    const res = await server
      .patch('/api/user/changeInfo')
      .send({
        nickName: "test_nickname",
        city: 'test_city',
        picture: 'test.png'
      })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('Can change password', async () => {
    const res = await server
      .patch('/api/user/changePassword')
      .send({
        password: testUser.password,
        newPassword: `p_${Date.now()}`
      })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('Can delete a user', async () => {
    const res = await server
      .post('/api/user/delete')
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)

    const resAfterDeletion = await server
      .post('/api/user/isExist')
      .send({ userName: testUser.userName })
    expect(resAfterDeletion.body.errno).not.toBe(0)
  })

  test('Username should not exist after being deleted', async () => {
    
  })

  test('Can log out', async () => {
    const res = await server
      .post('/api/user/logout')
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  
})


