// 封装 superagent 库
const superagent = require('superagent')
const { isEmpty } = require('lodash')

const allowMethods = ['GET', 'POST']

const errPromise = new Promise((resolve, reject) => {
  return reject('no url or method is not supported')
}).catch(err => err)

const superAgent = (url, {method = 'GET', options} = {}) => {
  if(!url || !allowMethods.includes(method)) return errPromise
  if(method === 'GET') {
    return new Promise((resolve, reject) => {
      return superagent(url)
        .end((err, res) => {
          if(err) {
            return reject(err)
          }
          return resolve(res)
        })
    })
  }
  if(method === 'POST') {
    const {json, headers} = options
    return new Promise((resolve, reject) => {
      let postPromise = superagent.post(url).send(json)
      /*
        * options 包含 post 数据 和 headers, 如
        * {
        *    json: { a: 1 },
        *    headers: { accept: 'json' }
        * }
        */
      if(headers && !isEmpty(headers)) {
        Object.keys(headers).forEach(key => {
          postPromise = postPromise.set(key, headers[key])
        })
      }
      return postPromise
        .end((err, res) => {
          if(err) {
            return reject(err)
          }
          return resolve(res)
        })
    })
  }
}

module.exports = superAgent
