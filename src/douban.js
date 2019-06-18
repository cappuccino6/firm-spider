const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const { douban } = targets
const { addQuery } = r(APP.L, 'url')

let data = []
let page_start = 0
let page_limit = 20
const page_total = 25 // 高分电影总共只有 500 部

const fetchData = async (start = 0) => {
  const res = await superAgent(addQuery(douban.url, {page_start: start, page_limit}))
  data = data.concat(res.subjects).sort((a, b) => b.rate - a.rate)
  if(page_start / page_limit < page_total) {
    page_start += page_limit
    fetchData(page_start)
  } else {
    writeFile('douban.json', {paging: {total: data.length}, data})
  }
}

module.exports = fetchData
