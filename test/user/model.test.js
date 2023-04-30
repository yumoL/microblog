/**
 * @description test user model schema
 */

const { User } = require('../../src/db/model/index')

test('User model schema is correct', () => {
  // build can create a user instance but does not save it to db
  const user = User.build({
    userName: "lxl",
    password: 'pwd123',
    nickName: 'haha',
    picture: '/abc.png',
    city: 'Helsinki'
  })

  expect(user.userName).toBe('lxl')
  expect(user.password).toBe('pwd123')
  expect(user.nickName).toBe('haha')
  expect(user.gender).toBe(3)
  expect(user.picture).toBe('/abc.png')
  expect(user.city).toBe('Helsinki')
})