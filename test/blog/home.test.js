/**
 * @description test blog home page api
 */

const server = require('../server')
const { registerAndLogin, destroyAll } = require('../testHelper')


let BLOG_ID = ''
let COOKIE = ''

describe('Home page', () => {
  beforeEach(async () => {
    await destroyAll()
    COOKIE = await registerAndLogin()
  })

  test('can create a new blog', async () => {
    const content = 'test content' + Date.now()
    const image = '/test.png'

    const res = await server
      .post('/api/blog/create')
      .send({
        content,
        image
      })
      .set('cookie', COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    BLOG_ID = res.body.data.id
  })

  test('Can load the first page of a blog list for home', async () => {
    const res = await server
      .get(`/api/blog/loadMore/0`)
      .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data
    for (p of ['isEmpty', 'blogList', 'pageSize', 'pageIndex', 'count']) {
      expect(data).toHaveProperty(p)
    }

  })
})

