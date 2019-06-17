const path = require('path')
const debug = require('debug')('fetchMovie')
const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const {$, $select} = r(APP.L, 'cheerio')

const { movie } = targets

const movieTypes = {
  0: 'drama', 
  1: 'comedy', 
  2: 'action', 
  3: 'love', 
  4: 'sciFi', 
  5: 'cartoon', 
  7: 'thriller',
  8: 'horror', 
  14: 'war',
  15: 'crime',
}

const typeIndex = Object.keys(movieTypes)

// 分析页面，得到页面节点选择器，'.co_content8 ul table'
const fetchMovieList = async (type = 0) => {
  debug(`fetch ${movieTypes[type]} movie`)
  // 存电影数据，title，磁力链接
  let data = []
  let currentPage = 1
  const totalPage = 20 // 抓取 20 页
  while(currentPage <= totalPage) {
    const url = movie.host + `/${type}/index${currentPage > 1 ? '_' + currentPage : ''}.html`
    const res = await superAgent(url, {}, 'static')
    const $ele = $select(res, '.co_content8 ul table')
    $ele.each((index, ele) => {
      const li = $(ele).html()
      $select(li, 'td b .ulink').last().each(async (idx, e) => {
        // TODO $(e).attr('href') api 无效？
        const link = movie.host + e.attribs.href
        const { magneto, score } = await fetchMoreInfo(link)
        const info = {title: $(e).text(), link, magneto, score}
        data.push(info)
        // 按评分倒序
        data.sort((a, b) => b.score - a.score)

        writeFile(`${movieTypes[type]}Movie.json`, {
          paging: { total: data.length },
          data
        }, path.join(APP.D, `movie`))
      })
    })
    currentPage++
  }
}

// 获取磁力链接 '.bd2 #Zoom table a'
const fetchMoreInfo = async link => {
  if(!link) return null
  let magneto = []
  let score = 0
  const res = await superAgent(link, {}, 'static')
  $select(res, '.bd2 #Zoom table a').each((index, ele) => {
    // 不做这个限制了，有些电影没有 magnet 链接
    // if(/^magnet/.test(ele.attribs.href)) {}
    magneto.push(ele.attribs.href)
  })
  $select(res, '.position .rank').each((index, ele) => {
    score = Number($(ele).text())
  })
  return { magneto, score }
}

// 获取所有类型电影，并发
const fetchAllMovies = () => {
  typeIndex.map(index => {
    fetchMovieList(index)
  })
}

module.exports = fetchAllMovies
