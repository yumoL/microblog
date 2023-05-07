/**
 * @description utils controller
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')

//directory where files are saved
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadedFiles')
//max size of the uploaded file is 1M
const MIX_SIZE = 1024 * 1024 * 1024

//create the folder if it does not exist
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * save file to server
 * @param {string} name
 * @param {string} type
 * @param {number} size
 * @param {string} filePath the path of the saved file, created by formidable-upload-koa middleware 
 */
async function saveFile ({ name, type, size, filePath }) {
  if (type > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // move file
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  return new SuccessModel({
    url: '/' + fileName
  })

}

module.exports = {
  saveFile
}