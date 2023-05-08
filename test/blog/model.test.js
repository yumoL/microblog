/**
 * @description test blog model schema
 */

const { Blog } = require('../../src/db/model/index')

test('Blog model schema is correct', () => {
  const blog = Blog.build({
    userId: 1,
    content: 'blog content',
    image: '/test.png'
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('blog content')
  expect(blog.image).toBe('/test.png')
})