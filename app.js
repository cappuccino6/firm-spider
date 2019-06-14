const Koa = require('koa')
const cors = require('koa2-cors');
const config = require('./config')
const package = r(APP.P)
const juejinFront = r(APP.S, 'juejinFront')
const debug = require('debug')(package.name)
const app = new Koa()

// 针对不同 app 跑不同的爬虫
const appName = process.env.APP_NAME
if(appName === 'juejin' ) {
  juejinFront()
}

// 注入多个 api
const apis = r(APP.A)
Object.values(apis).forEach(api => app.use(api))
app.use(cors)

app.listen(config.port)
debug('start')
