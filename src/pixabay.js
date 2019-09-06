const superAgent = r(APP.L, 'superagent')
const { targets } = r(APP.C)
const writeFile = r(APP.L, 'writeFile')
const {$, $select} = r(APP.L, 'cheerio')
const { addQuery } = r(APP.L, 'url')

const { pixabay } = targets

let data = []
let currentPage = 1
const totalPage = 5 // 抓取页

// 分析页面，得到页面节点选择器，'.item a'
const fetchPicList = async (pagi = 1) => {
  const url = addQuery(pixabay.url + `/images/search`, {pagi})
  const res = await superAgent(url, {}, 'static')
  const $ele = $select(res, '.item a')
  $ele.each(async (index, el) => {
    const imageUrl = await fetchImageUrl(pixabay.url + el.attribs.href)
    imageUrl && data.push(imageUrl)
    if(currentPage <= totalPage) {
      currentPage++
      fetchPicList(currentPage)
    } else {
      writeFile('pixabay.json', { paging: {total: data.length }, data })
    }
  })
}

// 获取图片链接 '#media_container img'
const fetchImageUrl = async link => {
  if(!link) return null
  const res = await superAgent(link, {}, 'static')
  let imgSrc = ''
  $select(res, '#media_container img').first().each((index, ele) => {
    imgSrc = ele.attribs.src
  })
  return imgSrc
}

module.exports = fetchPicList
