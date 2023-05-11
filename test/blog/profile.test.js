/**
 * @description unit test for personal zone
 */


const server = require('../server')
const { addBlogs, destroyAll, registerAndLogin } = require('../testHelper')
const { testUser } = require('../testUserInfo')

describe('Personal zone', () => {
  let COOKIE = ''
  beforeEach(async () => {
    await destroyAll()
    COOKIE = await registerAndLogin()
    await addBlogs()
  })
  test('Can load the first page of a blog list', async () => {
    const res = await server
      .get(`/api/profile/loadMore/${testUser.userName}/0`)
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    for (p of ['isEmpty', 'blogList', 'pageSize', 'pageIndex', 'count']) {
      expect(data).toHaveProperty(p)
    }

  })
})