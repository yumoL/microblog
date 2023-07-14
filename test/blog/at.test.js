/**
 * @description Test at-related functions
 */

const server = require('../server')
const { register,
  getUserIdByName,
  destroyAll,
  registerAndLogin
} = require('../testHelper')
const { testUser, testUser2 } = require('../testUserInfo')
const { AtRelation } = require('../../src/db/model/index')
const { markAsRead } = require('../../src/controller/blog-at')

describe('At-related functions', () => {
  let user1Cookie = ''
  let userId1, userId2
  let blogId

  beforeEach(async () => {
    await destroyAll()
    user1Cookie = await registerAndLogin()
    await register(testUser2)
    userId1 = await getUserIdByName(testUser.userName)
    userId2 = await getUserIdByName(testUser2.userName)

    // unfollow first
    await server
      .post('/api/profile/unFollow')
      .send({ userId: userId2 })
      .set('cookie', user1Cookie)

    // user1 follows user2
    await server
      .post('/api/profile/follow')
      .send({ userId: userId2 })
      .set('cookie', user1Cookie)

    // user1 @ user2 in a blog
    const content = `Testing blog @${testUser2.nickName}-${testUser2.userName}`
    const res = await server
      .post('/api/blog/create')
      .send({ content })
      .set('cookie', user1Cookie)
    expect(res.body.errno).toBe(0)
    blogId = res.body.data.id

  })

  test('User1 can @ user2 when creating a blog', async () => {
    const atResult = await AtRelation.findOne({
      where: {
        blogId,
        userId: userId2
      }
    })
    expect(atResult.dataValues.isRead).toBe(false)
  })

  test('User2 should see the blogs that at him', async () => {
    const user2Cookie = await registerAndLogin(testUser2.userName, testUser2.password)
    const res2 = await server
      .get('/api/atMe/loadMore/0')
      .set('cookie', user2Cookie)
    expect(res2.body.errno).toBe(0)
    const blogList = res2.body.data.blogList
    const haveBlog = blogList.some(blog => blog.id === blogId)
    expect(haveBlog).toBe(true)
  })

  test('Can mark a blog as read', async () => {
    await markAsRead(userId2)
    const atResult = await AtRelation.findOne({
      where: {
        blogId,
        userId: userId2
      }     
    })
    expect(atResult.dataValues.isRead).toBe(true)
  })
})