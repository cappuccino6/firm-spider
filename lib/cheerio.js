const cheerio = require('cheerio')

const $ = html => cheerio.load(html)

const $select = ({html, selector}) => $(html)(selector)

const $html = ({html, selector}) => $(html)(selector).html()

const $attr = ({html, selector, attr}) => $(html)(selector).attr(attr)


module.exports = {
  $,
  $select,
  $html,
  $attr
}