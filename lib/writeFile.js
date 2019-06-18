const fs = require('fs')
const path = require('path')
const debug = require('debug')('writeFile')

// 默认都写入 data 文件夹下的对应文件
module.exports = (filename, data, filepath) => {
  const writeData = JSON.stringify(data, '', '\t')
  const lastPath = path.join(filepath || APP.D, filename)
  if(!fs.existsSync(path.join(filepath || APP.D))) {
    fs.mkdirSync(path.join(filepath || APP.D))
  }
  fs.writeFileSync(lastPath, writeData, function(err) {
    if(err) {
      debug(`Error: some error occured, the status is ${err.status}`)
    }
  })
}


