const fs = require('fs')
const path = require('path')
const debug = require('debug')('writeFile')

// 默认都写入 data 文件夹下的对应文件
module.exports = (filename, data) => {
  const writeData = JSON.stringify(data, '', '\t')
  const filePath = path.join(APP.D, filename)
  fs.writeFileSync(filePath, writeData, function(err) {
    if(err) {
      debug(`some err occured, the status is ${err.status}`)
    }
  })
}
