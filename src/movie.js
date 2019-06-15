const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const {$, $select} = r(APP.L, 'cheerio')

const { movie } = targets

let currentPage = 1
const totalPage = 10 // 抓取 10 页


// 存电影数据，title，磁力链接
const data = []

// 分析页面，得到页面节点选择器，'.co_content8 ul table'
const fetchMovieList = async () => {
  while(currentPage <= totalPage) {
    const url = movie.url + `index${currentPage > 1 ? '_' + currentPage : ''}.html`
    const res = await superAgent(url, {}, 'static')
    const $ele = $select(res, '.co_content8 ul table')
    $ele.each((index, ele) => {
      const li = $(ele).html()
      // 这个选择器材下两个 a 标签，第一个电影名称，第二个链接
      $select(li, 'td b .ulink').last().each(async (idx, e) => {
        // TODO $(e).attr('href') api 无效？
        const link = movie.host + e.attribs.href
        const magneto = await fetchmagneto(link)
        const info = {title: $(e).text(), link, magneto}
        data.push(info)

        writeFile('movie.json', {
          paging: { total: data.length },
          data
        })
      })
    })
    currentPage++
  }
}

// 获取磁力链接 '.bd2 #Zoom table a'
const fetchmagneto = async link => {
  if(!link) return null
  let magnets = []
  const res = await superAgent(link, {}, 'static')
  $select(res, '.bd2 #Zoom table a').each((index, ele) => {
    const magnet = ele.attribs.href
    // 不做这个限制了，有些电影没有 magnet 链接
    // if(/^magnet/.test(magnet)) {}
    magnets.push(magnet)
  })
  return magnets
}

module.exports = fetchMovieList
