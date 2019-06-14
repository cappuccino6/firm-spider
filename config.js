const path = require('path')
const base = require('app-root-dir')

// 全局的 require 方式
global.r = (p = base.get(), m = '') => require(path.join(p, m))

// 全局的路径配置
global.APP = {
  R: base.get(),
  C: path.resolve(base.get(), 'config.js'),
  P: path.resolve(base.get(), 'package.json'),
  A: path.resolve(base.get(), 'apis'),
  L: path.resolve(base.get(), 'lib'),
  S: path.resolve(base.get(), 'src'),
  D: path.resolve(base.get(), 'data'),
  M: path.resolve(base.get(), 'model')
}

// 所有抓取目标
const targets = {
  juejinFront: {
    url: 'https://web-api.juejin.im/query',
    method: 'POST',
    options: {
      headers: {
        'X-Agent': 'Juejin/Web',
        'X-Legacy-Device-Id': '1559199715822',
        'X-Legacy-Token': 'eyJhY2Nlc3NfdG9rZW4iOiJoZ01va0dVNnhLV1U0VGtqIiwicmVmcmVzaF90b2tlbiI6IkczSk81TU9QRjd3WFozY2IiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
        'X-Legacy-Uid': '5c9449c15188252d9179ce68'
      }
    }
  }
}

module.exports = {
  port: 8081,
  targets,
  spiderHost: 'https://juejin.im/timeline/frontend',
}