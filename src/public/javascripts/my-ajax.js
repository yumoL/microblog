/**
 * @description ajax based on jquery
 */

(function (window, $) {
  if (window.ajax != null) {
    console.error('window.ajax is occupied')
    return
  }
  window.ajax = {}

  // get
  window.ajax.get = function (url, callback) {
    ajaxFn('get', url, null, callback)
  }
  // post
  window.ajax.post = function (url, params, callback) {
    //checks if the params parameter is actually a function. 
    //If it is, this means that the params parameter was not provided 
    //and the callback parameter is actually the second parameter. 
    //In this case, the function sets params to an empty object and sets callback to the provided function.
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('post', url, params, callback)
  }
  // patch
  window.ajax.patch = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('patch', url, params, callback)
  }
  // delete 
  window.ajax.delete = function (url, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    ajaxFn('delete', url, params, callback)
  }
  // upload files
  window.ajax.upload = function (url, file, callback) {
    var formData = new FormData()
    formData.append('file', file)
    $.ajax({
      type: 'POST',
      url,
      contentType: false,
      processData: false,
      data: formData,
      success: function (res) {
        if (res.errno !== 0) {
          // error
          callback(res.message)
          return
        }
        // everything is fine
        callback(null, res.data)
      },
      error: function (error) {
        // error
        callback(error.message)
      }
    })
  }

  // unified processing
  function ajaxFn(method, url, params, callback) {
    $.ajax({
      type: method.toUpperCase(),
      url,
      contentType: 'application/json;charset=UTF-8',
      data: params ? JSON.stringify(params) : '',
      success: function (res) {
        if (res.errno !== 0) {
          // error
          callback(res.message)
          return
        }
        // ok
        callback(null, res.data)
      },
      error: function (error) {
        // error
        callback(error.message)
      }
    })
  }
})(window, jQuery)
