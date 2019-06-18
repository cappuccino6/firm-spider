const Koa = require('koa')
const cors = require('koa2-cors');
const config = require('./config')
const package = r(APP.P)
const juejinFront = r(APP.S, 'juejinFront')
const redBook = r(APP.S, 'redBook')
const movie = r(APP.S, 'movie')
const jianshu = r(APP.S, 'jianshu')
const pixabay = r(APP.S, 'pixabay')
const debug = require('debug')(package.name)
const app = new Koa()

// 针对不同 app 跑不同的爬虫
const appName = process.env.APP_NAME

const spiders = {
  juejin: juejinFront,
  redBook: redBook,
  movie: movie,
  jianshu: jianshu,
  pixabay: pixabay
}

if(spiders[appName]) {
  spiders[appName]()
}

// 注入多个 api
const apis = r(APP.A)
Object.values(apis).forEach(api => app.use(api))
app.use(cors)

app.listen(config.port)
debug('start')
