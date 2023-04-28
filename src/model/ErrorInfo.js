/**
 * @description what to show in case of failing response
 */

module.exports = {
  registerUserNameExistInfo: {
    errno: 10001,
    message: 'Username already exists'
  },
  
  registerFailInfo: {
    errno: 10002,
    message: 'Registration failed'
  },
  
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: 'Username does not exist'
  },
  
  loginFailInfo: {
    errno: 10004,
    message: 'Login failed, wrong username or password'
  },
  
  loginCheckFailInfo: {
    errno: 10005,
    message: 'You have not yet logged in, please log in first'
  },

  changePasswordFailInfo: {
    errno: 10006,
    message: 'Failed to change password, please retry'
  },

  uploadFileSizeFailInfo: {
    errno: 10007,
    message: 'The size of the uploaded file is too large'
  },

  changeInfoFailInfo: {
    errno: 10008,
    message: 'Failed to change user info'
  },

  jsonSchemaFileInfo: {
    errno: 10009,
    message: 'Validation failed'
  },
 
  deleteUserFailInfo: {
    errno: 10010,
    message: 'Failed to delete a user'
  },


  addFollowerFailInfo: {
    errno: 10011,
    message: 'Failed to follow the user'
  },

  deleteFollowerFailInfo: {
    errno: 10012,
    message: 'Failed to cancel the following'
  },

  createBlogFailInfo: {
    errno: 11001,
    message: 'Failed to add a new blog'
  },

  deleteBlogFailInfo: {
    errno: 11002,
    message: 'Failed to delete a blog'
  }
}