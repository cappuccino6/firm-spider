const cheerio = require('cheerio')

const $ = html => cheerio.load(html, {
  ignoreWhitespace: true,
  xmlMode: true
})

const $select = (html, selector) => $(html)(selector)

// 节点属性
const $attr = (html, attr) => $(html).attr(attr)


module.exports = {
  $,
  $select,
  $attr
}