const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const { redBook } = targets

// 小红书的请求 header 针对不同 tab 下数据不一样，这边只给一个抓取旅行第一页数据的案例
const fetchData = async () => {
  const res = await superAgent(redBook.url, redBook)
  writeFile('redBook.json', {paging: {total: res.data.length}, data: res.data})
}

module.exports = fetchData
