const fs = require('fs')
const path = require('path')
const debug = require('debug')('readFile')

// 默认读取 data 文件夹下的文件
module.exports = (filename, filepath = APP.D) => {
  const file = path.join(filepath, filename)
  if(fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8')
  } else {
    debug(`Error: the file is not exist`)
  }
}