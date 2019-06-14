const { get } = require('lodash')
const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const { juejinFront } = targets

let totalPage = 9 // 只抓取十页

const getPostJson = ({after = ''}) => {
  return {
    extensions: {query: {id: '653b587c5c7c8a00ddf67fc66f989d42'}},
    operationName: '',
    query: '',
    variables: {limit: 10, category: '5562b415e4b00c57d9b94ac8', after, order: 'POPULAR', first: 20}
  }
}

// 保存所有文章数据
let data = []
let paging = {}

const fetchData = async (params = {}) => {
  const {method, options: {headers}} = juejinFront
  const options = {method, options: {headers, json: getPostJson(params)}}
  const res = await superAgent(juejinFront.url, options)
  const resItems = get(res, 'body.data.articleFeed.items', {})
  data = data.concat(resItems.edges)
  paging = {
    total: data.length,
    ...resItems.pageInfo
  }
  pageInfo = resItems.pageInfo
  if(resItems.pageInfo.hasNextPage && totalPage > 0) {
    fetchData({after: resItems.pageInfo.endCursor})
    totalPage--
  } else {
    writeFile('juejinFront.json', {paging, data})
  }
}

module.exports = fetchData
