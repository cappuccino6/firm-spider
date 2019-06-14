
// 手动生成分页数据
const {getQuery, addQuery} = r(APP.L, 'url')
const {isEmpty} = require('lodash')

module.exports = (ctx, originData) => {
  return new Promise((resolve) => {
    const {url, header: {host}} = ctx
    if(!url || isEmpty(originData)) {
      return resolve({
        data: [],
        paging: {}
      })
    }
    const {data, paging} = JSON.parse(originData)
    const query = getQuery(url)
    const limit = parseInt(query.limit) || 10
    const offset = parseInt(query.offset) || 0
    const isEnd = offset + limit >= data.length
    const prev = addQuery(`http://${host}${url}`, {limit, offset: Math.max(offset - limit, 0)})
    const next = addQuery(`http://${host}${url}`, {limit, offset: Math.max(offset + limit, 0)})
    const formatData = {
      data: data.slice(offset, offset + limit),
      paging: Object.assign({}, paging, {prev, next, isEnd})
    }
    return resolve(formatData)
  })
}
