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
  },
  // 简书，这里只抓取前端相关文章作为例子
  jianshu: {
    url: 'https://www.jianshu.com/search/do?q=%E5%89%8D%E7%AB%AF&type=note&page=1&order_by=default',
    method: 'POST',
    options: {
      json: {
        q: '前端',
        type: 'note',
        page: 1,
        'order_by': 'default'
      },
      headers: {
        authority: 'www.jianshu.com',
        method: 'POST',
        path: '/search/do?q=%E5%89%8D%E7%AB%AF&type=note&page=1&order_by=default',
        scheme: 'https',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'content-length': 0,
        cookie: 'read_mode=day; default_font=font2; locale=zh-CN; __yadk_uid=p818HzcH1BJiRkBpwbOR2GEDJ5Vucsf4; _m7e_session_core=1604c95f1e6eb9231fd6aad263b4d07d; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22169c36ef7ad41d-088051ea45222-36637902-1296000-169c36ef7aefb%22%2C%22%24device_id%22%3A%22169c36ef7ad41d-088051ea45222-36637902-1296000-169c36ef7aefb%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Flink%22%2C%22%24latest_referrer_host%22%3A%22www.baidu.com%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_utm_source%22%3A%22navbar-apps%22%2C%22%24latest_utm_medium%22%3A%22desktop%22%7D%7D; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1560592386,1560760874,1560761201,1560767998; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1560768021; signin_redirect=https%3A%2F%2Fwww.jianshu.com%2Fsearch%2Fdo%3Fq%3D%25E5%2589%258D%25E7%25AB%25AF%26type%3Dnote%26page%3D1%26order_by%3Ddefault',
        origin: 'https://www.jianshu.com',
        referer: 'https://www.jianshu.com/search?q=%E5%89%8D%E7%AB%AF&page=1&type=note',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
        'x-csrf-token': 'qeMRny6bQolDmuekWOyM7AxFBPLVv4mS1/r0y1ALYYWtOb+zPQLB1732YAKsDrDYBhNrRGphI8a4Gt+6Wf34zQ=='
      }
    }
  },
  // pixabay 图片网站
  pixabay:  {
    url: 'https://pixabay.com'
  },
  // 豆瓣高分电影
  douban: {
    url: 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=20&page_start=0'
  }
}

module.exports = {
  port: 8081,
  targets
}