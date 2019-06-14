const { get } = require('lodash')
const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeJson = r(APP.L, 'writeJson')
const { juejinFront } = targets

let totalPage = 5 // 只抓取十页

const getPostJson = ({after = ''}) => {
  return {
    extensions: {query: {id: '653b587c5c7c8a00ddf67fc66f989d42'}},
    operationName: '',
    query: '',
    variables: {limit: 20, category: '5562b415e4b00c57d9b94ac8', after, order: 'POPULAR', first: 20}
  }
}

const fetchData = async (params = {}) => {
  const {method, options: {headers}} = juejinFront
  const options = {method, options: {headers, json: getPostJson(params)}}
  const res = await superAgent(juejinFront.url, options)
  const resItems = get(res, 'body.data.articleFeed.items', {})
  writeJson('juejinFront.json', resItems)
  pageInfo = resItems.pageInfo
  if(resItems.pageInfo.hasNextPage && totalPage > 0) {
    totalPage--
    fetchData({after: resItems.pageInfo.endCursor})
  }
}

module.exports = fetchData
