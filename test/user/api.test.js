/**
 * @description test user api
 */

const server = require('../server')

// user info
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}
let COOKIE = ''

//register
test('can register a new user', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0)
})

test('cannot register a user with duplicated username', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})

test('can check if a username is existing', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).toBe(0)
})

test('invalidated user info should not be registered', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '111',
      password: 'a',
      gender: 'male'
    })
  expect(res.body.errno).not.toBe(0)
})

// login
test('can log in', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(res.body.errno).toBe(0)
  COOKIE = res.headers['set-cookie'].join(";")
})

// delete user
test('can delete a user', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// ensure that the user is deleted
test('username should not exist after being deleted', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0)
})