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
  // 掘金前端相关的文章
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
  },
  // 小红书 旅行 tab 下相关的数据
  redBook: {
    url: 'https://www.xiaohongshu.com/fe_api/burdock/v1/homefeed/notes?page_size=20&oid=travel&page=1',
    method: 'GET',
    options: {
      headers: {
        'method': 'GET',
        'authority': 'www.xiaohongshu.com',
        'path': '/fe_api/burdock/v1/homefeed/notes?page_size=20&oid=travel&page=1',
        'scheme': 'https',
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'x-sign': 'Xf45f97f0a5c31d48043a5a60be2d907d',
        'referer': 'https://www.xiaohongshu.com/explore?tab=travel',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'cookie': 'xhsTracker=url=/&searchengine=baidu; xhsTrackerId=e17d6eb5-80b1-4756-c7f1-89126248e17c; extra_exp_ids=; xhs_spses.5dde=*; Hm_lvt_d0ae755ac51e3c5ff9b1596b0c09c826=1560523537; Hm_lvt_9df7d19786b04345ae62033bd17f6278=1560523677; Hm_lpvt_9df7d19786b04345ae62033bd17f6278=1560523677; Hm_lpvt_d0ae755ac51e3c5ff9b1596b0c09c826=1560523678; xhs_spid.5dde=035273f4297a0477.1560523536.1.1560523701.1560523536.2c4d8938-372e-4a1a-8c6a-5b094f735ee0'
      }
    }
  },
  // 电影天堂的所所有类型的电影
  movie: {
    url: 'https://www.dy2018.com'
  }
}

module.exports = {
  port: 8081,
  targets
}