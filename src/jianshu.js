const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const { jianshu } = targets
const { addQuery } = r(APP.L, 'url')

let data = []
let currentPage = 1
const totalPage = 100 // 抓简书前端相关 100 页数据

const getPath = page => `/search/do?q=%E5%89%8D%E7%AB%AF&type=note&page=${page}&order_by=default`
const getReferer = page => `https://www.jianshu.com/search?q=%E5%89%8D%E7%AB%AF&page=${page}&type=note`

const fetchData = async (query = {}) => {
  const {page = 1} = query
  const {options: {json, headers}} = jianshu
  const newOptions = {
    method: jianshu.method,
    options: {
      json: Object.assign({}, json, {page}),
      headers: Object.assign({}, headers, {
        path: getPath(page),
        referer: getReferer(page)
      })
    }
  }
  const res = await superAgent(addQuery(jianshu.url, {page}), newOptions)
  res.entries.forEach(item => {
    data.push(item)
  })
  if(currentPage < totalPage) {
    currentPage++
    fetchData({page: currentPage})
  } else {
    writeFile('jianshu.json', { paging: {total: data.length}, data })
  }
}


module.exports = fetchData
