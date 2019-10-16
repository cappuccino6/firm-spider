const Koa = require('koa')
const cors = require('koa2-cors');
const config = require('./config')
const package = r(APP.P)
const juejinFront = r(APP.S, 'juejinFront')
const redBook = r(APP.S, 'redBook')
const movie = r(APP.S, 'movie')
const jianshu = r(APP.S, 'jianshu')
const pixabay = r(APP.S, 'pixabay')
const douban = r(APP.S, 'douban')
const wenku = r(APP.S, 'wenku')
const debug = require('debug')(package.name)
const app = new Koa()

// 针对不同 app 跑不同的爬虫
const appName = process.env.APP_NAME

const spiders = {
  juejin: juejinFront,
  redBook: redBook,
  movie: movie,
  jianshu: jianshu,
  pixabay: pixabay,
  douban: douban,
  wenku: wenku
}

if(spiders[appName]) {
  spiders[appName]()
}

if(appName === 'all') {
  Object.values(spiders).map(spider => spider())
}

process.on('unhandledRejection', err => {
  console.log(err)
})

process.on('uncaughtException', err => {
  console.log(err)
})

// 注入多个路由
const routes = r(APP.A)
Object.values(routes).forEach(route => app.use(route))
app.use(cors)

app.listen(config.port, () => {
  console.log(`The project is running at http://localhost:${config.port}`)
})

debug('start')
