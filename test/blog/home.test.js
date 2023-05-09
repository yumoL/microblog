/**
 * @description test blog home page api
 */

const server = require('../server')
const { registerAndLogin } = require('../testHelper')
const { Blog } = require('../../src/db/model/index')

let BLOG_ID = ''
let COOKIE = ''

describe('Home page', () => {
  beforeEach(async () => {
    await Blog.destroy({ where: {} })
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
})

