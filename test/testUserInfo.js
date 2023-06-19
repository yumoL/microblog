/**
 * @description fake user info usedin testing
 */

const userName = 'testUser1'
const password = 'testPwd'
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

const testUser2 = {
  userName: 'testUser2',
  password,
  nickName: 'testUser2',
  gender: 1
}

module.exports = {
  testUser,
  testUser2
}