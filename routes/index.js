const juejinApi = require('./juejin')
const redBookApi = require('./redBook')
const movieApi = require('./movie')
const pixabayApi = require('./pixabay')
const doubanApi = require('./douban')
const indexPage = require('./view') // 产出一些页面
const notFoundApi = require('./404')

module.exports = {
  juejinApi,
  redBookApi,
  movieApi,
  pixabayApi,
  doubanApi,
  indexPage,
  notFoundApi
}