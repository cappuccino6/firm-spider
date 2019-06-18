// 封装 superagent 库
const superagent = require('superagent')
const { isEmpty } = require('lodash')
const charset = require('superagent-charset')
const debug = require('debug')('superAgent')

charset(superagent)

const allowMethods = ['GET', 'POST']

const errPromise = new Promise((resolve, reject) => {
  return reject('no url or method is not supported')
}).catch(err => err)


 /*
  * options 包含 post 数据 和 headers, 如
  * {
  *    json: { a: 1 },
  *    headers: { accept: 'json' }
  * }
  */

// mode 区分动态还是静态抓取， unicode 为页面编码方式，静态页面中使用
const superAgent = (url, {method = 'GET', options = {}} = {}, mode = 'dynamic', unicode = 'gbk') => {
  if(!url || !allowMethods.includes(method)) return errPromise
  const {headers} = options

  let postPromise 

  if(method === 'GET') {
    postPromise = superagent.get(url)
    if(mode === 'static') {
      // 抓取的静态页面需要根据编码模式解码
      postPromise = postPromise.charset(unicode)
    }
  }

  if(method === 'POST') {
    const {json} = options
    postPromise = superagent.post(url).send(json)
  }

  if(headers && !isEmpty(headers)) {
    postPromise = postPromise.set(headers)
  }

  return new Promise(resolve => {
    return postPromise
      .end((err, res) => {
        if(err) {
          console.log('err', err)
          // 不抛错
          return resolve(`There is a ${err.status} error has not been resolved`)
        }
        // 静态页面，返回 text 页面内容
        if(mode === 'static') {
          debug('output html in static mode')
          return resolve(res.text)
        }
        return resolve(res.body)
      })
  })
}

module.exports = superAgent
