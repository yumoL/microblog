/**
 * @description define response model
 */

class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno
    if (data) this.data = data
    if (message) this.message = message
  }
}

/**
 * successful response model
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * failed response model
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}