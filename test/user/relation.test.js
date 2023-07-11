/**
 * @description test apis for handling user relations (follow/unfollow)
 */

const { testUser, testUser2 } = require('../testUserInfo')
const { register,
  getUserIdByName,
  destroyAll,
  registerAndLogin
} = require('../testHelper')
const { getFans, getFollowees } = require('../../src/controller/user-relation')
const server = require('../server')

describe('Relation', () => {
  let COOKIE = ''
  let userId1, userId2
  beforeEach(async () => {
    await destroyAll()
    COOKIE = await registerAndLogin()
    await register(testUser2)
    userId1 = await getUserIdByName(testUser.userName)
    userId2 = await getUserIdByName(testUser2.userName)

    // unfollow first
    await server
      .post('/api/profile/unFollow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)
  })

  test('User1 can follow user2', async () => {
    const res = await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
  })

  test('User1 should be user2 fan', async () => {
    // follow first
    await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)
      
    const result = await getFans(userId2)
    const { count, fansList } = result.data
    const hasUser1Name = fansList.some(fanInfo => {
      return fanInfo.userName === testUser.userName
    })
    expect(count > 0).toBe(true)
    expect(hasUser1Name).toBe(true)
  })

  test('User2 should be user1 followee', async () => {
    await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)

    const result = await getFollowees(userId1)
    const { count, followeesList } = result.data
    const hasUser2Name = followeesList.some(followeeInfo => {
      return followeeInfo.userName === testUser2.userName
    })
    expect(count > 0).toBe(true)
    expect(hasUser2Name).toBe(true)
  })

  test('The @ list of user1 should have user2', async() => {
    await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)

    const res = await server
      .get('/api/user/getAtList')
      .set('cookie', COOKIE)
    const atList = res.body
    const hasTestUser2 = atList.some(item => `${testUser.nickName}-${testUser.userName}`)
    expect(hasTestUser2).toBe(true)
  })

  test('User1 can unfollow user2', async () => {
    await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)

    const res = await server
      .post('/api/profile/unFollow')
      .send({ userId: userId2 })
      .set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
  })
})